-- Add-on Settings Table (global, editable from admin)
CREATE TABLE IF NOT EXISTS addon_settings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '📦',
  details JSONB NOT NULL DEFAULT '[]',
  original_price INTEGER NOT NULL,
  discounted_price INTEGER NOT NULL,
  highlight TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Industry Templates Table
CREATE TABLE IF NOT EXISTS industry_templates (
  industry TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  executive_summary TEXT NOT NULL,
  target_keywords JSONB NOT NULL DEFAULT '[]',
  seo_deliverables JSONB NOT NULL DEFAULT '{}',
  services_setup JSONB NOT NULL DEFAULT '[]',
  services_monthly JSONB NOT NULL DEFAULT '[]',
  base_setup_fee INTEGER NOT NULL DEFAULT 1500,
  base_monthly_retainer INTEGER NOT NULL DEFAULT 1200,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add new fields to proposals table
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS selected_addons JSONB DEFAULT '[]';
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS signature_data TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS monthly_total INTEGER;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS fb_ads_budget TEXT DEFAULT 'recommended';

-- Seed default add-ons (from dr-ogonna)
INSERT INTO addon_settings (id, name, description, icon, details, original_price, discounted_price, highlight, sort_order) VALUES
  ('blog', 'SEO Blog Content', 'Dominate local search with authority content', '📝', 
   '["12 blog posts per month", "2,500+ words each, SEO-optimized", "Keyword research & targeting", "Internal linking strategy", "Builds topical authority"]',
   1200, 597, 'BEST FOR SEO', 1),
  ('reputation', 'Reputation Management', 'Reviews = trust for businesses', '⭐',
   '["Review monitoring (Google, Yelp, etc.)", "Professional response management", "Review generation campaigns", "Negative review mitigation", "Monthly reputation report"]',
   497, 297, 'CRITICAL FOR TRUST', 2),
  ('social', 'Social Media Management', 'Visual content drives leads', '📸',
   '["12-16 posts/month on FB & IG", "Professional photo/video content", "Professional editing & post production", "Content calendar & strategy", "Community management & engagement"]',
   797, 497, 'PRO CONTENT INCLUDED', 3),
  ('email', 'Email Marketing', 'Nurture leads & retain customers', '📧',
   '["Monthly newsletter", "Automated nurture sequences", "Re-engagement campaigns", "Lead capture optimization", "Performance analytics"]',
   497, 297, NULL, 4),
  ('video', 'Video/Reels Package', 'Short-form video dominates social feeds', '🎬',
   '["8 short-form videos per month", "Professionally shot & edited", "Optimized for IG Reels, TikTok, FB", "Trending audio & hooks", "Testimonial clips"]',
   797, 497, NULL, 5)
ON CONFLICT (id) DO NOTHING;

-- Seed industry templates
INSERT INTO industry_templates (industry, display_name, executive_summary, target_keywords, seo_deliverables, services_setup, services_monthly, base_setup_fee, base_monthly_retainer) VALUES
  ('medical', 'Medical & Wellness', 
   'This proposal outlines a comprehensive digital marketing strategy designed to increase your online visibility, drive qualified patient leads, and establish your practice as a dominant presence in your local market. Our goal is to get you ranking in the Google Maps Top 3 within 4-6 months, allowing you to eventually reduce or eliminate your Google Ads spend while maintaining a steady flow of new patients.',
   '[{"keyword": "weight loss clinic las vegas", "volume": 720, "intent": "High intent, broad", "competition": "High"},
     {"keyword": "semaglutide las vegas", "volume": 480, "intent": "Hot — GLP-1 trend 🔥", "competition": "Medium-High"},
     {"keyword": "medical weight loss las vegas", "volume": 590, "intent": "Broad, qualified", "competition": "High"},
     {"keyword": "ozempic weight loss las vegas", "volume": 320, "intent": "Brand name searches", "competition": "Medium"},
     {"keyword": "phentermine las vegas", "volume": 260, "intent": "Niche offer ⭐", "competition": "Medium"}]',
   '{"everyMonth": ["Monthly Rank Report", "SEO Audit & Recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing service"],
     "rotating": [
       {"name": "Guest Posting", "icon": "✍️", "items": ["Up to 3 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
       {"name": "Press Releases", "icon": "📰", "items": ["Up to 5 PR submissions", "Professionally written", "Strategic distribution"]},
       {"name": "Competitor Backlinks", "icon": "🔗", "items": ["Up to 20 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
       {"name": "Google News Links", "icon": "🌐", "items": ["Up to 5 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]}
     ]}',
   '["Google Ads audit + conversion tracking setup", "Facebook/Instagram Ads setup + first ad creatives", "On-site keyword optimization", "Google Business Profile audit and optimization", "Access setup for website & Google Business Profile", "Local SEO & citation building", "Google Ads management", "FB/IG Ads management"]',
   '["Local SEO & citation building", "Google Ads management & optimization", "Facebook/Instagram Ads management", "Monthly 20-minute strategy call (Thursdays)", "Performance reporting & recommendations"]',
   1500, 1200),
   
  ('venue', 'Event Venues',
   'This proposal outlines a comprehensive digital marketing strategy designed to increase your venue''s online visibility, drive qualified event inquiries, and establish your space as the go-to destination in your local market. Our goal is to get you ranking in the Google Maps Top 3 within 4-6 months for high-intent venue searches.',
   '[{"keyword": "event venue las vegas", "volume": 880, "intent": "High intent", "competition": "High"},
     {"keyword": "wedding venue las vegas", "volume": 1200, "intent": "High intent, transactional", "competition": "High"},
     {"keyword": "banquet hall las vegas", "volume": 480, "intent": "Qualified, local", "competition": "Medium"},
     {"keyword": "party venue las vegas", "volume": 390, "intent": "Broad, social events", "competition": "Medium"},
     {"keyword": "corporate event space las vegas", "volume": 210, "intent": "B2B, higher value", "competition": "Medium"}]',
   '{"everyMonth": ["Monthly Rank Report", "SEO Audit & Recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing service"],
     "rotating": [
       {"name": "Guest Posting", "icon": "✍️", "items": ["Up to 3 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
       {"name": "Press Releases", "icon": "📰", "items": ["Up to 5 PR submissions", "Professionally written", "Strategic distribution"]},
       {"name": "Competitor Backlinks", "icon": "🔗", "items": ["Up to 20 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
       {"name": "Google News Links", "icon": "🌐", "items": ["Up to 5 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]}
     ]}',
   '["Google Ads audit + conversion tracking setup", "Facebook/Instagram Ads setup + first ad creatives", "On-site keyword optimization", "Google Business Profile audit and optimization", "Virtual tour optimization", "Local SEO & citation building", "Google Ads management", "FB/IG Ads management"]',
   '["Local SEO & citation building", "Google Ads management & optimization", "Facebook/Instagram Ads management", "Monthly 20-minute strategy call (Thursdays)", "Performance reporting & recommendations"]',
   1500, 1200),
   
  ('home-services', 'Home Services',
   'This proposal outlines a comprehensive digital marketing strategy designed to increase your online visibility, generate qualified leads, and establish your business as the trusted choice in your service area. Our goal is to get you ranking in the Google Maps Top 3 within 4-6 months.',
   '[{"keyword": "plumber las vegas", "volume": 2400, "intent": "High intent, emergency", "competition": "High"},
     {"keyword": "hvac las vegas", "volume": 1900, "intent": "High intent, seasonal", "competition": "High"},
     {"keyword": "electrician las vegas", "volume": 1600, "intent": "High intent", "competition": "High"},
     {"keyword": "handyman las vegas", "volume": 720, "intent": "Broad services", "competition": "Medium"},
     {"keyword": "home repair las vegas", "volume": 480, "intent": "General, qualified", "competition": "Medium"}]',
   '{"everyMonth": ["Monthly Rank Report", "SEO Audit & Recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing service"],
     "rotating": [
       {"name": "Guest Posting", "icon": "✍️", "items": ["Up to 3 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
       {"name": "Press Releases", "icon": "📰", "items": ["Up to 5 PR submissions", "Professionally written", "Strategic distribution"]},
       {"name": "Competitor Backlinks", "icon": "🔗", "items": ["Up to 20 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
       {"name": "Google News Links", "icon": "🌐", "items": ["Up to 5 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]}
     ]}',
   '["Google Ads audit + conversion tracking setup", "Facebook/Instagram Ads setup + first ad creatives", "On-site keyword optimization", "Google Business Profile audit and optimization", "Review generation setup", "Local SEO & citation building", "Google Ads management", "FB/IG Ads management"]',
   '["Local SEO & citation building", "Google Ads management & optimization", "Facebook/Instagram Ads management", "Monthly 20-minute strategy call (Thursdays)", "Performance reporting & recommendations"]',
   1500, 1200),
   
  ('small-business', 'Small Business',
   'This proposal outlines a comprehensive digital marketing strategy designed to increase your online visibility, drive qualified leads, and establish your business as a dominant presence in your local market. Our goal is to get you ranking in the Google Maps Top 3 within 4-6 months.',
   '[{"keyword": "YOUR KEYWORD las vegas", "volume": 500, "intent": "High intent", "competition": "Medium"},
     {"keyword": "YOUR SERVICE near me", "volume": 400, "intent": "Local intent", "competition": "Medium"},
     {"keyword": "best YOUR BUSINESS las vegas", "volume": 300, "intent": "Qualified, comparison", "competition": "Medium"}]',
   '{"everyMonth": ["Monthly Rank Report", "SEO Audit & Recommendations", "Pinterest, Reddit, Tumblr sharing", "Social bookmarking", "Premium link indexing service"],
     "rotating": [
       {"name": "Guest Posting", "icon": "✍️", "items": ["Up to 3 DA 40+ guest posts", "400-800 word unique articles", "Do-follow backlinks"]},
       {"name": "Press Releases", "icon": "📰", "items": ["Up to 5 PR submissions", "Professionally written", "Strategic distribution"]},
       {"name": "Competitor Backlinks", "icon": "🔗", "items": ["Up to 20 competitor backlinks", "DA 20-90 authority sites", "Niche-relevant placements"]},
       {"name": "Google News Links", "icon": "🌐", "items": ["Up to 5 Google News backlinks", "DA 40-90 news sites", "Authority & trust signals"]}
     ]}',
   '["Google Ads audit + conversion tracking setup", "Facebook/Instagram Ads setup + first ad creatives", "On-site keyword optimization", "Google Business Profile audit and optimization", "Local SEO & citation building", "Google Ads management", "FB/IG Ads management"]',
   '["Local SEO & citation building", "Google Ads management & optimization", "Facebook/Instagram Ads management", "Monthly 20-minute strategy call (Thursdays)", "Performance reporting & recommendations"]',
   1500, 1200)
ON CONFLICT (industry) DO NOTHING;

-- Enable RLS
ALTER TABLE addon_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_templates ENABLE ROW LEVEL SECURITY;

-- Allow public read for client-facing proposals
CREATE POLICY "Public can read active addons" ON addon_settings FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read templates" ON industry_templates FOR SELECT USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER addon_settings_updated_at BEFORE UPDATE ON addon_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER industry_templates_updated_at BEFORE UPDATE ON industry_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
