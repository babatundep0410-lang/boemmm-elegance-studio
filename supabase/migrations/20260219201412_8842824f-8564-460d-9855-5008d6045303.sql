
-- Add collection_id to categories, linking each category to a collection
ALTER TABLE public.categories
ADD COLUMN collection_id uuid REFERENCES public.collections(id) ON DELETE CASCADE;
