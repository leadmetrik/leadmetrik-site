import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  const { error } = await supabase
    .from('proposals')
    .update({ viewed_at: new Date().toISOString() })
    .eq('slug', slug)
    .is('viewed_at', null)
  
  if (error) {
    return NextResponse.json({ error: 'Failed to mark as viewed' }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
