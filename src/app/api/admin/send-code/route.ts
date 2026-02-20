import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isAdminEmail, generateCode } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !isAdminEmail(email)) {
      // Don't reveal if email is valid or not
      return NextResponse.json({ success: true, message: 'If this email is registered, a code has been sent.' });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store code in database
    const { error: dbError } = await supabaseAdmin
      .from('admin_codes')
      .upsert({
        email: email.toLowerCase(),
        code,
        expires_at: expiresAt.toISOString(),
        used: false,
      }, { onConflict: 'email' });

    if (dbError) {
      console.error('DB error storing code:', dbError);
      return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
    }

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Lead Metrik <noreply@updates.leadmetrik.com>',
      to: email,
      subject: 'Your Admin Login Code',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
          <img src="https://leadmetrik-site.vercel.app/logo.jpg" alt="Lead Metrik" style="height: 40px; margin-bottom: 30px;" />
          <h2 style="color: #1A202C; margin-bottom: 20px;">Admin Login Code</h2>
          <p style="color: #4A5568; margin-bottom: 30px;">Enter this code to access the admin dashboard:</p>
          <div style="background: #F7FAFC; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1A202C;">${code}</span>
          </div>
          <p style="color: #718096; font-size: 14px;">This code expires in 5 minutes.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Code sent to your email.' });
  } catch (error) {
    console.error('Send code error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
