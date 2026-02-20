import { NextRequest, NextResponse } from 'next/server';
import { isAdminEmail, createAdminToken, setAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code || !isAdminEmail(email)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check code in database
    const { data: codeRecord, error: dbError } = await supabaseAdmin
      .from('admin_codes')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('code', code)
      .eq('used', false)
      .single();

    if (dbError || !codeRecord) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });
    }

    // Check expiry
    if (new Date(codeRecord.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Code expired' }, { status: 401 });
    }

    // Mark code as used
    await supabaseAdmin
      .from('admin_codes')
      .update({ used: true })
      .eq('email', email.toLowerCase());

    // Create session token
    const token = await createAdminToken();
    await setAdminSession(token);

    return NextResponse.json({ success: true, redirect: '/admin' });
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
