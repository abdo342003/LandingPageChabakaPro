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

-- Enable Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

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
