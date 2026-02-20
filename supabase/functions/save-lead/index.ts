import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadData {
  name: string
  email: string
  phone?: string
  website?: string
  company?: string
  industry: string
  business_size?: string
  challenge?: string
  source?: string
  lead_type: 'package' | 'audit'  // NEW: package = selected pricing tier, audit = free audit request
  selected_tier?: 'starter' | 'growth' | 'dominate'  // NEW: only for package leads
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const data: LeadData = await req.json()

    // Validate required fields
    if (!data.name || !data.email || !data.industry) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, industry' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Default to audit if not specified
    const leadType = data.lead_type || 'audit'
    
    // Validate package leads have a tier
    if (leadType === 'package' && !data.selected_tier) {
      return new Response(
        JSON.stringify({ error: 'Package leads require selected_tier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Save lead to database
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        company: data.company,
        industry: data.industry,
        business_size: data.business_size || 'small',
        challenge: data.challenge,
        source: data.source || 'website',
        lead_type: leadType,
        selected_tier: data.selected_tier,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        status: 'new',
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Shared tier data
    const industryEmoji: Record<string, string> = {
      'medical': '🏥',
      'venue': '🎪',
      'home-services': '🔧',
      'small-business': '🏪',
    }

    const tierPrices: Record<string, number> = {
      'starter': 500,
      'growth': 1200,
      'dominate': 2500,
    }

    const tierLabels: Record<string, string> = {
      'starter': 'Starter',
      'growth': 'Growth',
      'dominate': 'Dominate',
    }

    // Send Telegram notification to Mark
    const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const telegramChatId = Deno.env.get('TELEGRAM_CHAT_ID')

    if (telegramBotToken && telegramChatId) {

      let message: string
      let buttons: Array<Array<{ text: string; callback_data?: string; url?: string }>>

      if (leadType === 'package' && data.selected_tier) {
        // PACKAGE LEAD - ready to send proposal immediately
        const price = tierPrices[data.selected_tier]
        const tierLabel = tierLabels[data.selected_tier]
        
        message = `🔥 *NEW LEAD — ${tierLabel.toUpperCase()} PACKAGE*

${industryEmoji[data.industry] || '📊'} *${data.company || data.name}*
📧 ${data.email}
${data.phone ? `📱 ${data.phone}` : ''}
${data.website ? `🌐 ${data.website}` : ''}

💰 *$${price.toLocaleString()}/mo* ${tierLabel} tier selected
🏷️ Industry: ${data.industry.replace('-', ' ')}
${data.challenge ? `💬 ${data.challenge}` : ''}`

        buttons = [[
          { text: '📄 Send Proposal', callback_data: `send_proposal:${lead.id}` },
          { text: '👤 View Lead', url: `https://leadmetrik-site.vercel.app/admin/leads` }
        ]]
      } else {
        // AUDIT LEAD - needs call before sending proposal
        message = `🔍 *NEW LEAD — AUDIT REQUEST*

${industryEmoji[data.industry] || '📊'} *${data.company || data.name}*
📧 ${data.email}
${data.phone ? `📱 ${data.phone}` : ''}
${data.website ? `🌐 ${data.website}` : ''}

🏷️ Industry: ${data.industry.replace('-', ' ')}
${data.challenge ? `💬 ${data.challenge}` : ''}

⏳ *Needs call before proposal*`

        buttons = [[
          { text: '📞 Schedule Call', url: 'https://calendly.com/leadmetrik/discovery' },
          { text: '✏️ Edit Draft', url: `https://leadmetrik-site.vercel.app/admin/leads` }
        ]]
      }

      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            reply_markup: { inline_keyboard: buttons }
          }),
        })
      } catch (telegramError) {
        console.error('Telegram notification failed:', telegramError)
      }
    }

    // Send confirmation email to prospect via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (resendApiKey) {
      const firstName = data.name.split(' ')[0]
      
      // Different emails for package vs audit leads
      let emailSubject: string
      let emailBody: string

      if (leadType === 'package' && data.selected_tier) {
        const tierLabel = tierLabels[data.selected_tier]
        emailSubject = `${firstName}, your ${tierLabel} proposal is on the way!`
        emailBody = `
  <h1 style="color: #1a202c; font-size: 24px; margin-bottom: 20px;">Great choice, ${firstName}! 🎉</h1>
  
  <p>You selected our <strong>${tierLabel}</strong> package — smart move.</p>
  
  <p>I'm putting together your custom marketing proposal right now. You'll receive it within the next few minutes.</p>
  
  <p>The proposal will include:</p>
  
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 10px;">Detailed breakdown of what we'll deliver</li>
    <li style="margin-bottom: 10px;">Keyword research for your market</li>
    <li style="margin-bottom: 10px;">Expected timeline and milestones</li>
    <li style="margin-bottom: 10px;">Simple sign-off to get started</li>
  </ul>
  
  <p>Keep an eye on your inbox!</p>`
      } else {
        emailSubject = `${firstName}, we got your audit request!`
        emailBody = `
  <h1 style="color: #1a202c; font-size: 24px; margin-bottom: 20px;">Hey ${firstName}! 👋</h1>
  
  <p>Thanks for requesting a free marketing audit from LeadMetrik.</p>
  
  <p>Here's what happens next:</p>
  
  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>We'll review your online presence</strong> — website, Google rankings, reviews, competitors</li>
    <li style="margin-bottom: 10px;"><strong>Quick discovery call</strong> — 15 minutes to understand your goals</li>
    <li style="margin-bottom: 10px;"><strong>Custom proposal</strong> — specific recommendations + pricing for your business</li>
  </ol>
  
  <p>Expect to hear from us within 24 hours (usually much faster).</p>`
      }

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://leadmetrik-site.vercel.app/logo.jpg" alt="Lead Metrik" style="height: 40px;">
  </div>
  
  ${emailBody}
  
  <p style="margin-top: 30px;">
    Questions? Just reply to this email or call us at <a href="tel:+17029964415" style="color: #f97316;">(702) 996-4415</a>.
  </p>
  
  <p style="margin-top: 30px; color: #666;">
    Talk soon,<br>
    <strong>Mark</strong><br>
    LeadMetrik
  </p>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p style="font-size: 12px; color: #999; text-align: center;">
    LeadMetrik • Las Vegas SEO & Marketing Agency<br>
    <a href="https://leadmetrik.com" style="color: #f97316;">leadmetrik.com</a>
  </p>
</body>
</html>`

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'LeadMetrik <hello@leadmetrik.com>',
            to: data.email,
            subject: emailSubject,
            html: emailHtml,
            reply_to: 'mark@leadmetrik.com',
          }),
        })
      } catch (emailError) {
        console.error('Email send failed:', emailError)
      }
    }

    return new Response(
      JSON.stringify({ success: true, lead }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
