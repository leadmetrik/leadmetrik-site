-- Add target_service and city to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS target_service TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'Las Vegas';

-- Add keyword_data to proposals table (stores DataForSEO results)
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS keyword_data JSONB;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS keywords_researched_at TIMESTAMPTZ;

-- Update existing test lead with defaults
UPDATE leads SET city = 'Las Vegas' WHERE city IS NULL;
