
-- Create collections table
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Admins can insert collections" ON public.collections FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete collections" ON public.collections FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed from existing products
INSERT INTO public.collections (name, slug)
SELECT DISTINCT collection, collection_slug FROM public.products WHERE collection != '' AND collection_slug != ''
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug)
SELECT DISTINCT category, category_slug FROM public.products WHERE category != '' AND category_slug != ''
ON CONFLICT (slug) DO NOTHING;
