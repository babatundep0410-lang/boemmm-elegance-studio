
-- Allow authenticated users to read orders
CREATE POLICY "Authenticated users can read orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (true);

-- Drop the old deny policy
DROP POLICY "No public read on orders" ON public.orders;

-- Allow authenticated users to read inquiries
CREATE POLICY "Authenticated users can read inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Drop the old deny policy
DROP POLICY "No public read on inquiries" ON public.inquiries;
