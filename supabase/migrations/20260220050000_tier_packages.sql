-- Tier packages with deliverables matched to Lucky Digitals
CREATE TABLE IF NOT EXISTS tier_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  setup_fee INTEGER NOT NULL DEFAULT 1500,
  description TEXT NOT NULL,
  tagline TEXT,
  lucky_digitals_package TEXT NOT NULL,  -- 'standard' or 'deluxe'
  lucky_digitals_cost INTEGER NOT NULL,   -- $150 or $250
  profit_margin INTEGER NOT NULL,         -- calculated: price - lucky_digitals_cost
  
  -- SEO deliverables (from Lucky Digitals)
  urls_included INTEGER NOT NULL DEFAULT 1,
  keywords_included INTEGER NOT NULL DEFAULT 5,
  tier1_backlinks INTEGER NOT NULL DEFAULT 120,
  tier2_backlinks INTEGER NOT NULL DEFAULT 1410,
  
  -- Features (what we tell the client)
  features JSONB NOT NULL DEFAULT '[]',
  
  -- SEO deliverables breakdown
  seo_setup JSONB NOT NULL DEFAULT '[]',
  seo_monthly JSONB NOT NULL DEFAULT '[]',
  
  is_popular BOOLEAN DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the three tiers matched to Lucky Digitals
INSERT INTO tier_packages (id, name, price, setup_fee, description, tagline, lucky_digitals_package, lucky_digitals_cost, profit_margin, urls_included, keywords_included, tier1_backlinks, tier2_backlinks, is_popular, sort_order, features, seo_setup, seo_monthly) VALUES
(
  'starter',
  'Starter',
  500,
  500,
  'Perfect for businesses just getting started with SEO',
  'Get Found Locally',
  'standard',
  150,
  350,
  1,
  5,
  120,
  1410,
  FALSE,
  1,
  '[
    "5 target keywords",
    "Local SEO optimization",
    "Google Business Profile setup",
    "Monthly rank reporting",
    "Basic backlink building",
    "Citation building"
  ]',
  '[
    "SEO audit & site review",
    "Keyword research (5 keywords)",
    "Google Business Profile optimization",
    "Local citation building (25+ sites)",
    "On-page optimization recommendations"
  ]',
  '[
    {"category": "Every Month", "items": ["Monthly rank report", "SEO audit & recommendations", "Social bookmarking", "Link indexing service"]},
    {"category": "Guest Posting", "items": ["Up to 2 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
    {"category": "Link Building", "items": ["120 Tier 1 backlinks", "1,410 Tier 2 backlinks", "Foundation backlink building"]},
    {"category": "Citations & Reviews", "items": ["Local citation building", "Review monitoring", "GBP link building"]}
  ]'
),
(
  'growth',
  'Growth',
  1200,
  1000,
  'Most popular choice for businesses ready to scale',
  'Dominate Your Market',
  'standard',
  150,
  1050,
  1,
  5,
  120,
  1410,
  TRUE,
  2,
  '[
    "5 target keywords",
    "Full local SEO package",
    "Google Business Profile management",
    "Monthly rank reporting",
    "Aggressive backlink building",
    "Google Ads management included",
    "Monthly strategy call"
  ]',
  '[
    "Comprehensive SEO audit",
    "Keyword research (5 keywords)",
    "Google Business Profile optimization",
    "Local citation building (50+ sites)",
    "On-page SEO implementation",
    "Google Ads setup + conversion tracking",
    "Competitor analysis"
  ]',
  '[
    {"category": "Every Month", "items": ["Monthly rank report", "SEO audit & recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing"]},
    {"category": "Guest Posting", "items": ["Up to 3 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
    {"category": "Press Releases", "items": ["Up to 5 PR submissions", "Professionally written", "Strategic distribution"]},
    {"category": "Competitor Backlinks", "items": ["Up to 20 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
    {"category": "Google News", "items": ["Up to 5 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]},
    {"category": "Google Ads", "items": ["Ongoing campaign management", "Bid optimization", "Conversion tracking", "Monthly performance report"]},
    {"category": "Strategy", "items": ["Monthly 20-min strategy call", "Priority support"]}
  ]'
),
(
  'dominate',
  'Dominate',
  2500,
  1500,
  'Full-service marketing for serious growth',
  'Own Your City',
  'deluxe',
  250,
  2250,
  2,
  10,
  250,
  2820,
  FALSE,
  3,
  '[
    "10 target keywords",
    "2 URL/domain optimization",
    "Full GBP management & posts",
    "Premium backlink building",
    "Google Ads management",
    "Facebook/Instagram Ads",
    "Competitor analysis",
    "Bi-weekly strategy calls"
  ]',
  '[
    "Deep-dive SEO audit",
    "Keyword research (10 keywords)",
    "2 URL optimization setup",
    "Google Business Profile optimization",
    "Yelp & Yellow Pages optimization",
    "Local citation building (75+ sites)",
    "Full on-page SEO implementation",
    "Google Ads setup + conversion tracking",
    "Facebook/Instagram Ads setup",
    "Competitor backlink analysis"
  ]',
  '[
    {"category": "Every Month", "items": ["Monthly rank report", "SEO audit & recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing"]},
    {"category": "Guest Posting", "items": ["Up to 5 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
    {"category": "Press Releases", "items": ["Up to 8 PR submissions", "Professionally written", "Strategic distribution"]},
    {"category": "Competitor Backlinks", "items": ["Up to 30 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
    {"category": "Google News", "items": ["Up to 8 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]},
    {"category": "Scholarship Links", "items": ["Up to 5 scholarship link placements", ".edu authority domains", "High-trust signals"]},
    {"category": "GBP Management", "items": ["Google Business Profile posts (2/month)", "Review response management", "Q&A optimization", "Photo updates"]},
    {"category": "Paid Ads", "items": ["Google Ads management", "Facebook/Instagram Ads management", "Conversion optimization", "Monthly ad performance report"]},
    {"category": "Strategy", "items": ["Bi-weekly 20-min strategy calls", "Competitor monitoring", "Priority support", "Quarterly business review"]}
  ]'
)
ON CONFLICT (id) DO UPDATE SET
  price = EXCLUDED.price,
  setup_fee = EXCLUDED.setup_fee,
  features = EXCLUDED.features,
  seo_setup = EXCLUDED.seo_setup,
  seo_monthly = EXCLUDED.seo_monthly,
  lucky_digitals_cost = EXCLUDED.lucky_digitals_cost,
  profit_margin = EXCLUDED.profit_margin;

-- Enable RLS
ALTER TABLE tier_packages ENABLE ROW LEVEL SECURITY;

-- Allow public read for pricing page (drop first to make idempotent)
DROP POLICY IF EXISTS "Public can read active tiers" ON tier_packages;
CREATE POLICY "Public can read active tiers" ON tier_packages FOR SELECT USING (is_active = true);

-- Updated_at trigger
DROP TRIGGER IF EXISTS tier_packages_updated_at ON tier_packages;
CREATE TRIGGER tier_packages_updated_at BEFORE UPDATE ON tier_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
