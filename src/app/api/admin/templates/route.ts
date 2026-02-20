import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: templates, error } = await supabaseAdmin
    .from('industry_templates')
    .select('*')
    .order('industry', { ascending: true });

  if (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }

  return NextResponse.json({ templates });
}

export async function PUT(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { templates } = await request.json();

    for (const template of templates) {
      const { error } = await supabaseAdmin
        .from('industry_templates')
        .update({
          display_name: template.display_name,
          base_monthly_price: template.base_monthly_price,
          setup_fee: template.setup_fee,
          executive_summary: template.executive_summary,
          target_keywords: template.target_keywords,
          seo_deliverables: template.seo_deliverables,
          is_active: template.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', template.id);

      if (error) {
        console.error('Error updating template:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving templates:', error);
    return NextResponse.json({ error: 'Failed to save templates' }, { status: 500 });
  }
}
