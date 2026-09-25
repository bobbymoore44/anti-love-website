-- Create interests table for fallback storage
CREATE TABLE IF NOT EXISTS public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  first_name TEXT,
  product_handle TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_id TEXT,
  style_code TEXT,
  size TEXT,
  colour TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  synced_to_shopify BOOLEAN DEFAULT false,
  shopify_error TEXT
);

-- Enable RLS
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (since this is a public form)
CREATE POLICY "Anyone can register interest"
  ON public.interests
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view all interests
CREATE POLICY "Authenticated users can view interests"
  ON public.interests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_interests_email ON public.interests(email);
CREATE INDEX idx_interests_product ON public.interests(product_handle);
CREATE INDEX idx_interests_created_at ON public.interests(created_at DESC);