-- EliteVA Signups Table
-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS eliteva_signups (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at     timestamptz DEFAULT now(),
  name           text        NOT NULL,
  business_name  text,
  email          text        NOT NULL,
  phone          text,
  business_type  text        NOT NULL,
  plan_interest  text        NOT NULL,
  business_pains text        NOT NULL,
  ai_recommendation jsonb,
  status         text        DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE eliteva_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (public signup form)
CREATE POLICY "Allow public signups"
  ON eliteva_signups FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admin) can SELECT
CREATE POLICY "Allow authenticated reads"
  ON eliteva_signups FOR SELECT
  USING (auth.role() = 'authenticated');
