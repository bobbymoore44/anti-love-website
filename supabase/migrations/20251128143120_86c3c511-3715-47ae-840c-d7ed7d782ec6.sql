-- Fix RLS policies for interests table to allow reading by admin panel

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access to interests" ON public.interests;
DROP POLICY IF EXISTS "Allow authenticated read access to interests" ON public.interests;

-- Allow authenticated users to read all interests (for admin panel)
CREATE POLICY "Allow authenticated read access to interests"
ON public.interests
FOR SELECT
TO authenticated
USING (true);

-- Allow service role to do everything (for edge function)
CREATE POLICY "Service role has full access to interests"
ON public.interests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add policy for public insert (since the edge function runs as service_role, this might not be needed but keeping for safety)
CREATE POLICY "Allow public insert to interests"
ON public.interests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);