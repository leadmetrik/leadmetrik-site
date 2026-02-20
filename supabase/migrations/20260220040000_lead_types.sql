-- Add lead_type and selected_tier columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'audit' CHECK (lead_type IN ('audit', 'package'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS selected_tier TEXT CHECK (selected_tier IS NULL OR selected_tier IN ('starter', 'growth', 'dominate'));

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_selected_tier ON leads(selected_tier);

-- Update existing leads to be audit type
UPDATE leads SET lead_type = 'audit' WHERE lead_type IS NULL;

COMMENT ON COLUMN leads.lead_type IS 'audit = needs call first, package = selected a pricing tier';
COMMENT ON COLUMN leads.selected_tier IS 'starter ($500), growth ($1200), dominate ($2500) - only for package leads';
