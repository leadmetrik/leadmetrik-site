import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: addons, error } = await supabaseAdmin
    .from('addon_settings')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching addons:', error);
    return NextResponse.json({ error: 'Failed to fetch addons' }, { status: 500 });
  }

  return NextResponse.json({ addons });
}

export async function PUT(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { addons } = await request.json();

    // Separate new addons from existing ones
    const newAddons = addons.filter((a: { id: string }) => a.id.startsWith('new-'));
    const existingAddons = addons.filter((a: { id: string }) => !a.id.startsWith('new-'));

    // Update existing addons
    for (const addon of existingAddons) {
      const { error } = await supabaseAdmin
        .from('addon_settings')
        .update({
          name: addon.name,
          description: addon.description,
          price: addon.price,
          is_active: addon.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', addon.id);

      if (error) {
        console.error('Error updating addon:', error);
      }
    }

    // Insert new addons
    if (newAddons.length > 0) {
      const { error } = await supabaseAdmin
        .from('addon_settings')
        .insert(newAddons.map((a: { name: string; description: string; price: number; is_active: boolean }) => ({
          name: a.name,
          description: a.description,
          price: a.price,
          is_active: a.is_active,
        })));

      if (error) {
        console.error('Error inserting addons:', error);
      }
    }

    // Delete addons that were removed (compare with DB)
    const { data: dbAddons } = await supabaseAdmin.from('addon_settings').select('id');
    const submittedIds = existingAddons.map((a: { id: string }) => a.id);
    const toDelete = dbAddons?.filter(a => !submittedIds.includes(a.id)).map(a => a.id) || [];

    if (toDelete.length > 0) {
      await supabaseAdmin.from('addon_settings').delete().in('id', toDelete);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving addons:', error);
    return NextResponse.json({ error: 'Failed to save addons' }, { status: 500 });
  }
}
