import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DBProduct {
  id: string;
  slug: string;
  name: string;
  collection: string;
  collection_slug: string;
  category: string;
  category_slug: string;
  price: number;
  description: string;
  long_description: string;
  material: string | null;
  color: string | null;
  dimensions: string | null;
  weight: string | null;
  finish: string | null;
  images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
  exchange_rate: number;
  product_details: string | null;
  shipping_info: string | null;
  returns_info: string | null;
  homepage_title: string | null;
  homepage_subtitle: string | null;
}

// Adapts DB product to the shape components expect
export const toProductView = (p: DBProduct) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  collection: p.collection,
  collectionSlug: p.collection_slug,
  category: p.category,
  categorySlug: p.category_slug,
  price: p.price,
  description: p.description,
  longDescription: p.long_description,
  specifications: {
    material: p.material || '',
    color: p.color || '',
    dimensions: p.dimensions || '',
    weight: p.weight || '',
    finish: p.finish || '',
  },
  images: p.images,
  featured: p.featured,
  productDetails: p.product_details || '',
  shippingInfo: p.shipping_info || '',
  returnsInfo: p.returns_info || '',
});

export type ProductView = ReturnType<typeof toProductView>;

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as DBProduct[]) || [];
    },
  });

export const useProductBySlug = (collectionSlug: string, categorySlug: string) =>
  useQuery({
    queryKey: ['product', collectionSlug, categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug)
        .eq('category_slug', categorySlug)
        .maybeSingle();
      if (error) throw error;
      return data as DBProduct | null;
    },
  });

export const useProductsByCollection = (collectionSlug: string) =>
  useQuery({
    queryKey: ['products', 'collection', collectionSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('collection_slug', collectionSlug)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data as DBProduct[]) || [];
    },
  });
