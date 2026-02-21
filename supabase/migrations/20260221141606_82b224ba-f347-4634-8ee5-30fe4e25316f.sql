
ALTER TABLE public.products
  ADD COLUMN product_details text DEFAULT '',
  ADD COLUMN shipping_info text DEFAULT '',
  ADD COLUMN returns_info text DEFAULT '';
