import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface UpdateProposalRequest {
  proposalId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripeInvoiceId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: UpdateProposalRequest = await request.json();
    const { proposalId, stripeCustomerId, stripeSubscriptionId, stripeInvoiceId } = body;

    const { error } = await supabase
      .from('signed_proposals')
      .update({
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_invoice_id: stripeInvoiceId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    if (error) {
      console.error('Failed to update proposal:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update proposal error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update proposal' },
      { status: 500 }
    );
  }
}
