-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read articles"
ON public.articles FOR SELECT
USING (true);

-- Admin CRUD
CREATE POLICY "Admins can insert articles"
ON public.articles FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update articles"
ON public.articles FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete articles"
ON public.articles FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();