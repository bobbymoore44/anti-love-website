-- Drop overly permissive SELECT policies that expose customer data
DROP POLICY IF EXISTS "Allow authenticated read access to interests" ON public.interests;
DROP POLICY IF EXISTS "Authenticated users can view interests" ON public.interests;

-- Keep INSERT policies for public interest registration
-- Keep service role policy for edge functions (admin dashboard)

-- The remaining policies are:
-- 1. "Allow public insert to interests" - allows anyone to register interest
-- 2. "Anyone can register interest" - duplicate INSERT policy (keeping for safety)
-- 3. "Service role has full access to interests" - allows edge functions to read/write