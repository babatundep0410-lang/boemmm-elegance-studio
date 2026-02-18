-- Allow public read access to product-images bucket
CREATE POLICY "Public read access for product-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');