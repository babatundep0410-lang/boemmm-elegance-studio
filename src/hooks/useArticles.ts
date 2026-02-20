import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DBArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export const useArticles = () =>
  useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return (data as DBArticle[]) || [];
    },
  });

export const useArticleBySlug = (slug: string) =>
  useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data as DBArticle | null;
    },
  });
