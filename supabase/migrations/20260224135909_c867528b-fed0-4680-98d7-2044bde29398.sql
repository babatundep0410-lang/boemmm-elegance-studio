ALTER TABLE public.articles
  ADD COLUMN featured boolean NOT NULL DEFAULT false,
  ADD COLUMN homepage_title text DEFAULT '',
  ADD COLUMN homepage_subtitle text DEFAULT '',
  ADD COLUMN homepage_collection text DEFAULT '';