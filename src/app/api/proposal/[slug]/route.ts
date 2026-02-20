import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error || !data) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
  }
  
  return NextResponse.json(data)
}
