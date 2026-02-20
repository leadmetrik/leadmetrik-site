import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// DataForSEO credentials from env
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN!
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD!

interface KeywordResult {
  keyword: string
  volume: number
  competition: string
  cpc: number
  intent: string
}

function getCompetitionLevel(competitionIndex: number): string {
  if (competitionIndex >= 0.7) return 'High'
  if (competitionIndex >= 0.4) return 'Medium-High'
  if (competitionIndex >= 0.2) return 'Medium'
  return 'Low'
}

function getSearchIntent(keyword: string): string {
  const kw = keyword.toLowerCase()
  
  // High commercial intent
  if (kw.includes('near me') || kw.includes('cost') || kw.includes('price') || kw.includes('best')) {
    return 'High intent, transactional'
  }
  
  // Service-specific
  if (kw.includes('clinic') || kw.includes('doctor') || kw.includes('services')) {
    return 'Service-seeking'
  }
  
  // Location-based
  if (kw.match(/\b(las vegas|henderson|north las vegas|summerlin)\b/i)) {
    return 'Local, qualified'
  }
  
  // Branded/specific
  if (kw.includes('semaglutide') || kw.includes('ozempic') || kw.includes('wegovy')) {
    return 'Brand/product search 🔥'
  }
  
  return 'Broad, awareness'
}

export async function POST(request: NextRequest) {
  try {
    if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) {
      return NextResponse.json({ error: 'DataForSEO credentials not configured' }, { status: 500 })
    }

    const { proposal_id, lead_id, seed_keywords, city, industry } = await request.json()

    if (!proposal_id && !lead_id) {
      return NextResponse.json({ error: 'proposal_id or lead_id required' }, { status: 400 })
    }

    // Get lead info if only lead_id provided
    let targetCity = city
    let targetService = seed_keywords
    let proposalId = proposal_id

    if (lead_id && !proposal_id) {
      const { data: lead } = await supabase
        .from('leads')
        .select('*, proposals(id)')
        .eq('id', lead_id)
        .single()

      if (lead) {
        targetCity = lead.city || 'Las Vegas'
        targetService = lead.target_service || industry
        proposalId = lead.proposal_id
      }
    }

    // Build keyword list based on industry + city
    const location = targetCity || 'Las Vegas'
    const baseKeywords = generateSeedKeywords(industry || 'small-business', targetService, location)

    // Call DataForSEO API
    const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString('base64')
    
    const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        keywords: baseKeywords,
        location_name: 'United States',
        language_name: 'English',
      }]),
    })

    const data = await response.json()

    if (data.status_code !== 20000) {
      console.error('DataForSEO error:', data)
      return NextResponse.json({ error: 'Keyword research failed', details: data }, { status: 500 })
    }

    // Parse results
    const results = data.tasks?.[0]?.result || []
    const keywords: KeywordResult[] = results
      .filter((r: any) => r.search_volume > 0)
      .map((r: any) => ({
        keyword: r.keyword,
        volume: r.search_volume || 0,
        competition: getCompetitionLevel(r.competition_index || 0),
        cpc: r.cpc || 0,
        intent: getSearchIntent(r.keyword),
      }))
      .sort((a: KeywordResult, b: KeywordResult) => b.volume - a.volume)
      .slice(0, 10) // Top 10 keywords

    const totalVolume = keywords.reduce((sum, k) => sum + k.volume, 0)

    const keywordData = {
      keywords,
      total_volume: totalVolume,
      location: location,
      researched_at: new Date().toISOString(),
    }

    // Save to proposal if we have a proposal_id
    if (proposalId) {
      const { error: updateError } = await supabase
        .from('proposals')
        .update({
          keyword_data: keywordData,
          keywords_researched_at: new Date().toISOString(),
        })
        .eq('id', proposalId)

      if (updateError) {
        console.error('Failed to save keyword data:', updateError)
      }
    }

    return NextResponse.json({
      success: true,
      keyword_data: keywordData,
      proposal_id: proposalId,
    })

  } catch (error) {
    console.error('Research keywords error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateSeedKeywords(industry: string, targetService: string | null, city: string): string[] {
  const cityLower = city.toLowerCase()
  const service = targetService?.toLowerCase() || ''
  
  const industryKeywords: Record<string, string[]> = {
    'medical': [
      `weight loss clinic ${cityLower}`,
      `medical weight loss ${cityLower}`,
      `semaglutide ${cityLower}`,
      `ozempic ${cityLower}`,
      `wegovy ${cityLower}`,
      `weight loss doctor ${cityLower}`,
      `phentermine ${cityLower}`,
      `weight loss injections ${cityLower}`,
      `weight loss program ${cityLower}`,
      `weight loss center ${cityLower}`,
      `medical spa ${cityLower}`,
      `weight loss near me`,
    ],
    'venue': [
      `event venue ${cityLower}`,
      `wedding venue ${cityLower}`,
      `banquet hall ${cityLower}`,
      `party venue ${cityLower}`,
      `event space ${cityLower}`,
      `reception hall ${cityLower}`,
      `corporate event venue ${cityLower}`,
      `quinceañera venue ${cityLower}`,
      `birthday party venue ${cityLower}`,
      `private event space ${cityLower}`,
    ],
    'home-services': [
      `plumber ${cityLower}`,
      `electrician ${cityLower}`,
      `hvac ${cityLower}`,
      `roofing ${cityLower}`,
      `landscaping ${cityLower}`,
      `handyman ${cityLower}`,
      `home repair ${cityLower}`,
      `ac repair ${cityLower}`,
      `plumbing services ${cityLower}`,
      `emergency plumber ${cityLower}`,
    ],
    'small-business': [
      `${service} ${cityLower}`,
      `${service} near me`,
      `best ${service} ${cityLower}`,
      `${service} services ${cityLower}`,
      `local ${service} ${cityLower}`,
    ],
  }

  let keywords = industryKeywords[industry] || industryKeywords['small-business']
  
  // If target_service is provided, add service-specific keywords
  if (targetService && industry !== 'small-business') {
    keywords = [
      `${targetService} ${cityLower}`,
      `${targetService} near me`,
      `best ${targetService} ${cityLower}`,
      ...keywords,
    ]
  }

  return keywords.filter(k => k.trim().length > 0).slice(0, 15)
}
