import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CollectionRow {
  id: string;
  name: string;
  slug: string;
  featured: boolean;
  created_at: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  collection_id: string | null;
  display_order: number;
  created_at: string;
}

export const useCollections = () =>
  useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('name');
      if (error) throw error;
      return (data as CollectionRow[]) || [];
    },
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order')
        .order('name');
      if (error) throw error;
      return (data as CategoryRow[]) || [];
    },
  });
