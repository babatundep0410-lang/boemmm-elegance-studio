import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { DBArticle } from '@/hooks/useArticles';

interface Props {
  article: DBArticle | null;
  onSaved: () => void;
  onCancel: () => void;
}

const AdminArticleForm = ({ article, onSaved, onCancel }: Props) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [author, setAuthor] = useState(article?.author || '');
  const [category, setCategory] = useState(article?.category || '');
  const [imageUrl, setImageUrl] = useState(article?.image_url || '');
  const [publishedAt, setPublishedAt] = useState(article?.published_at || new Date().toISOString().split('T')[0]);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!article) setSlug(generateSlug(val));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const path = `articles/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return;
    }
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
    setImageUrl(urlData.publicUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast({ title: 'Title and slug are required', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      image_url: imageUrl || null,
      published_at: publishedAt,
    };

    let error;
    if (article) {
      ({ error } = await supabase.from('articles').update(payload).eq('id', article.id));
    } else {
      ({ error } = await supabase.from('articles').insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: article ? 'Article updated' : 'Article created' });
      onSaved();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>← Back</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Article'}</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Author</Label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Letter, Community" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Published Date</Label>
          <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Image</Label>
          {imageUrl && <img src={imageUrl} alt="" className="w-24 h-16 object-cover rounded mb-1" />}
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Excerpt</Label>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
      </div>

      <div className="space-y-2">
        <Label>Content (HTML)</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="font-mono text-sm" />
      </div>
    </form>
  );
};

export default AdminArticleForm;
