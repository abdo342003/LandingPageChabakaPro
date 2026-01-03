-- Create submissions table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business TEXT NOT NULL,
  message TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  device_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

-- =====================================================
-- VISITOR ANALYTICS TABLE (Cookie Data Storage)
-- =====================================================

CREATE TABLE IF NOT EXISTS visitor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT UNIQUE NOT NULL,
  
  -- Authentication & Security
  session_id TEXT,
  auth_token TEXT,
  csrf_token TEXT,
  login_status BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ,
  
  -- Commerce & State
  cart_id TEXT,
  wishlist_id TEXT,
  form_data JSONB DEFAULT '{}',
  last_activity TIMESTAMPTZ,
  
  -- User Preferences
  language TEXT,
  theme TEXT DEFAULT 'system',
  region TEXT,
  currency TEXT DEFAULT 'MAD',
  font_size TEXT DEFAULT 'medium',
  accessibility_mode BOOLEAN DEFAULT FALSE,
  
  -- Tracking & Behavioral
  session_count INTEGER DEFAULT 1,
  first_visit TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_visit TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_views INTEGER DEFAULT 1,
  clickstream JSONB DEFAULT '[]',
  referral_source TEXT,
  utm_params JSONB DEFAULT '{}',
  ad_segments TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  
  -- Device Metadata
  screen_resolution TEXT,
  color_depth INTEGER,
  pixel_ratio NUMERIC(4,2),
  browser_type TEXT,
  browser_version TEXT,
  platform TEXT,
  is_mobile BOOLEAN DEFAULT FALSE,
  is_tablet BOOLEAN DEFAULT FALSE,
  connection_speed TEXT,
  do_not_track BOOLEAN DEFAULT FALSE,
  cookies_enabled BOOLEAN DEFAULT TRUE,
  timezone TEXT,
  device_language TEXT,
  
  -- Consent Metadata
  consent_timestamp TIMESTAMPTZ,
  consent_version TEXT DEFAULT '2.0',
  consent_categories JSONB DEFAULT '{"essential": true, "functional": true, "analytics": true, "marketing": true}',
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for visitor_analytics
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_visitor_id ON visitor_analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_first_visit ON visitor_analytics(first_visit DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_last_visit ON visitor_analytics(last_visit DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_browser ON visitor_analytics(browser_type);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_platform ON visitor_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_is_mobile ON visitor_analytics(is_mobile);

-- Enable Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anon inserts" ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous reads (for admin panel without auth)
CREATE POLICY "Allow anon reads" ON submissions
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow anonymous updates (for status changes)
CREATE POLICY "Allow anon updates" ON submissions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anonymous deletes (for admin deletions)
CREATE POLICY "Allow anon deletes" ON submissions
  FOR DELETE
  TO anon
  USING (true);

-- Also allow for public role
CREATE POLICY "Allow public inserts" ON submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public reads" ON submissions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public updates" ON submissions
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public deletes" ON submissions
  FOR DELETE
  TO public
  USING (true);

-- =====================================================
-- VISITOR ANALYTICS POLICIES
-- =====================================================

-- Allow anonymous inserts for visitor tracking
CREATE POLICY "Allow anon inserts analytics" ON visitor_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous reads for admin panel
CREATE POLICY "Allow anon reads analytics" ON visitor_analytics
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous updates for session updates
CREATE POLICY "Allow anon updates analytics" ON visitor_analytics
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous deletes for GDPR compliance
CREATE POLICY "Allow anon deletes analytics" ON visitor_analytics
  FOR DELETE
  TO anon
  USING (true);

-- Public role policies
CREATE POLICY "Allow public inserts analytics" ON visitor_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public reads analytics" ON visitor_analytics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public updates analytics" ON visitor_analytics
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public deletes analytics" ON visitor_analytics
  FOR DELETE
  TO public
  USING (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on visitor_analytics
CREATE TRIGGER update_visitor_analytics_updated_at
  BEFORE UPDATE ON visitor_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
