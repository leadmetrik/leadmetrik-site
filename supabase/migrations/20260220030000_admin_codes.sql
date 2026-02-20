-- Admin verification codes table
CREATE TABLE IF NOT EXISTS admin_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_admin_codes_email ON admin_codes(email);
CREATE INDEX IF NOT EXISTS idx_admin_codes_lookup ON admin_codes(email, code, used);

-- RLS policies (service role only)
ALTER TABLE admin_codes ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (drop first to make idempotent)
DROP POLICY IF EXISTS "Service role full access" ON admin_codes;
CREATE POLICY "Service role full access" ON admin_codes
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_admin_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admin_codes_updated_at ON admin_codes;
CREATE TRIGGER admin_codes_updated_at
  BEFORE UPDATE ON admin_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_codes_updated_at();

-- Cleanup old codes (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_admin_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM admin_codes WHERE expires_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;
