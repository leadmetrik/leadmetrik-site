import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe, STRIPE_PRICES, AddonId } from '@/lib/stripe';

interface CreateSubscriptionRequest {
  customerEmail: string;
  customerName: string;
  businessName?: string;
  selectedAddons: string[];
  signatureData: string; // base64 signature image
  proposalId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSubscriptionRequest = await request.json();
    const { customerEmail, customerName, businessName, selectedAddons, signatureData, proposalId } = body;

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Customer email and name are required' },
        { status: 400 }
      );
    }

    // 1. Create or retrieve customer
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customer: Stripe.Customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      // Update metadata if needed
      customer = await stripe.customers.update(customer.id, {
        name: customerName,
        metadata: {
          businessName: businessName || '',
          proposalId,
          signedAt: new Date().toISOString(),
        },
      });
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          businessName: businessName || '',
          proposalId,
          signedAt: new Date().toISOString(),
        },
      });
    }

    // 2. Build subscription items (base + selected addons)
    const subscriptionItems: Stripe.SubscriptionCreateParams.Item[] = [
      { price: STRIPE_PRICES.base }, // Base monthly retainer
    ];

    // Add selected addons
    for (const addonId of selectedAddons) {
      const priceId = STRIPE_PRICES.addons[addonId as AddonId];
      if (priceId) {
        subscriptionItems.push({ price: priceId });
      }
    }

    // 3. Create subscription with invoice
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: subscriptionItems,
      collection_method: 'send_invoice',
      days_until_due: 7, // Net 7 terms
      // Add the one-time setup fee to the first invoice
      add_invoice_items: [
        { price: STRIPE_PRICES.setup },
      ],
      metadata: {
        proposalId,
        selectedAddons: selectedAddons.join(','),
        signatureTimestamp: new Date().toISOString(),
      },
    });

    // 4. Get the invoice that was created
    const invoices = await stripe.invoices.list({
      subscription: subscription.id,
      limit: 1,
    });

    const invoice = invoices.data[0];

    // 5. Finalize and send the invoice immediately
    if (invoice && invoice.status === 'draft') {
      await stripe.invoices.finalizeInvoice(invoice.id);
      await stripe.invoices.sendInvoice(invoice.id);
    }

    // Calculate totals for response
    const setupFee = 1500;
    const baseMonthly = 1200;
    const addonPrices: Record<string, number> = {
      'seo-blog': 597,
      'reputation': 297,
      'social-media': 497,
      'email-marketing': 297,
      'video-reels': 497,
    };
    const addonTotal = selectedAddons.reduce((sum, id) => sum + (addonPrices[id] || 0), 0);
    const monthlyTotal = baseMonthly + addonTotal;
    const firstInvoiceTotal = setupFee + monthlyTotal;

    return NextResponse.json({
      success: true,
      customerId: customer.id,
      subscriptionId: subscription.id,
      invoiceId: invoice?.id,
      invoiceUrl: invoice?.hosted_invoice_url,
      invoicePdf: invoice?.invoice_pdf,
      totals: {
        setupFee,
        monthlyTotal,
        firstInvoiceTotal,
        selectedAddons,
      },
    });
  } catch (error) {
    console.error('Stripe subscription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
