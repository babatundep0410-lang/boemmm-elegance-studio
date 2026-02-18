
-- Fix collections: drop restrictive SELECT, create permissive one
DROP POLICY "Anyone can read collections" ON public.collections;
CREATE POLICY "Anyone can read collections" ON public.collections FOR SELECT USING (true);

-- Fix categories: drop restrictive SELECT, create permissive one
DROP POLICY "Anyone can read categories" ON public.categories;
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);

-- Fix collections: drop restrictive INSERT/DELETE, create permissive ones
DROP POLICY "Admins can insert collections" ON public.collections;
CREATE POLICY "Admins can insert collections" ON public.collections FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY "Admins can delete collections" ON public.collections;
CREATE POLICY "Admins can delete collections" ON public.collections FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix categories: drop restrictive INSERT/DELETE, create permissive ones
DROP POLICY "Admins can insert categories" ON public.categories;
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY "Admins can delete categories" ON public.categories;
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));
