import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X, Upload, Loader2, Plus } from 'lucide-react';
import type { DBProduct } from '@/hooks/useProducts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
  product?: DBProduct | null;
  onSaved: () => void;
  onCancel: () => void;
}

const emptyForm = {
  name: '',
  slug: '',
  collection: '',
  collection_slug: '',
  category: '',
  category_slug: '',
  price: '',
  description: '',
  long_description: '',
  material: '',
  color: '',
  dimensions: '',
  weight: '',
  finish: '',
  featured: false,
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const AdminProductForm = ({ product, onSaved, onCancel }: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addingNewCollection, setAddingNewCollection] = useState(false);
  const [addingNewCategory, setAddingNewCategory] = useState(false);
  const [newCollection, setNewCollection] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const { data: dbCollections } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const { data, error } = await supabase.from('collections').select('id, name, slug').order('name');
      if (error) throw error;
      return (data as { id: string; name: string; slug: string }[]) || [];
    },
  });

  const { data: dbCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name, slug, collection_id').order('name');
      if (error) throw error;
      return (data as { id: string; name: string; slug: string; collection_id: string | null }[]) || [];
    },
  });

  const existingCollections = useMemo(() => {
    const map = new Map<string, string>();
    if (form.collection && form.collection_slug) map.set(form.collection_slug, form.collection);
    (dbCollections || []).forEach(c => map.set(c.slug, c.name));
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [dbCollections, form.collection, form.collection_slug]);

  // Filter categories to only those belonging to the selected collection
  const selectedCollection = useMemo(() => {
    return (dbCollections || []).find(c => c.slug === form.collection_slug);
  }, [dbCollections, form.collection_slug]);

  const existingCategories = useMemo(() => {
    const filtered = (dbCategories || []).filter(c => 
      selectedCollection ? c.collection_id === selectedCollection.id : true
    );
    const map = new Map<string, string>();
    if (form.category && form.category_slug) map.set(form.category_slug, form.category);
    filtered.forEach(c => map.set(c.slug, c.name));
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [dbCategories, form.category, form.category_slug, selectedCollection]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        collection: product.collection,
        collection_slug: product.collection_slug,
        category: product.category,
        category_slug: product.category_slug,
        price: String(product.price),
        description: product.description,
        long_description: product.long_description,
        material: product.material || '',
        color: product.color || '',
        dimensions: product.dimensions || '',
        weight: product.weight || '',
        finish: product.finish || '',
        featured: product.featured,
      });
      setImages(product.images || []);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const autoSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);

    // Verify session before uploading
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: 'Upload failed', description: 'You must be logged in to upload images.', variant: 'destructive' });
      setUploading(false);
      return;
    }

    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
        continue;
      }
      newUrls.push(`${SUPABASE_URL}/storage/v1/object/public/product-images/${path}`);
    }
    setImages(prev => [...prev, ...newUrls]);
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast({ title: 'Name and slug are required', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      collection: form.collection,
      collection_slug: form.collection_slug,
      category: form.category,
      category_slug: form.category_slug,
      price: parseFloat(form.price) || 0,
      description: form.description,
      long_description: form.long_description,
      material: form.material || null,
      color: form.color || null,
      dimensions: form.dimensions || null,
      weight: form.weight || null,
      finish: form.finish || null,
      images,
      featured: form.featured,
    };

    let error;
    if (product) {
      ({ error } = await supabase.from('products').update(payload).eq('id', product.id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: product ? 'Product updated' : 'Product created' });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Name *</Label>
          <Input name="name" value={form.name} onChange={(e) => {
            handleChange(e);
            if (!product) setForm(prev => ({ ...prev, slug: autoSlug(e.target.value) }));
          }} required />
        </div>
        <div className="space-y-1.5">
          <Label>Slug *</Label>
          <Input name="slug" value={form.slug} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Collection</Label>
          {addingNewCollection ? (
            <div className="flex gap-2">
              <Input
                placeholder="New collection name"
                value={newCollection}
                onChange={(e) => setNewCollection(e.target.value)}
                autoFocus
              />
              <Button type="button" size="sm" onClick={async () => {
                if (newCollection.trim()) {
                  const name = newCollection.trim();
                  const slug = autoSlug(name);
                  const { error } = await supabase.from('collections').insert({ name, slug });
                  if (error && !error.message.includes('duplicate')) {
                    toast({ title: 'Error saving collection', description: error.message, variant: 'destructive' });
                    return;
                  }
                  queryClient.invalidateQueries({ queryKey: ['collections'] });
                  setForm(prev => ({ ...prev, collection: name, collection_slug: slug }));
                  setNewCollection('');
                  setAddingNewCollection(false);
                }
              }}>Add</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => { setAddingNewCollection(false); setNewCollection(''); }}>Cancel</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Select
                value={form.collection_slug}
                onValueChange={(val) => {
                  const found = existingCollections.find(c => c.slug === val);
                  if (found) setForm(prev => ({ ...prev, collection: found.name, collection_slug: found.slug }));
                }}
              >
                <SelectTrigger className="bg-background"><SelectValue placeholder="Select collection" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {existingCollections.map(c => (
                    <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" size="icon" variant="outline" onClick={() => setAddingNewCollection(true)} title="Add new collection">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Collection Slug</Label>
          <Input name="collection_slug" value={form.collection_slug} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Category</Label>
          {addingNewCategory ? (
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                autoFocus
              />
              <Button type="button" size="sm" onClick={async () => {
                if (newCategory.trim()) {
                  if (!selectedCollection) {
                    toast({ title: 'Select a collection first', variant: 'destructive' });
                    return;
                  }
                  const name = newCategory.trim();
                  const slug = autoSlug(name);
                  const { error } = await supabase.from('categories').insert({ name, slug, collection_id: selectedCollection.id });
                  if (error && !error.message.includes('duplicate')) {
                    toast({ title: 'Error saving category', description: error.message, variant: 'destructive' });
                    return;
                  }
                  queryClient.invalidateQueries({ queryKey: ['categories'] });
                  setForm(prev => ({ ...prev, category: name, category_slug: slug }));
                  setNewCategory('');
                  setAddingNewCategory(false);
                }
              }}>Add</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => { setAddingNewCategory(false); setNewCategory(''); }}>Cancel</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Select
                value={form.category_slug}
                onValueChange={(val) => {
                  const found = existingCategories.find(c => c.slug === val);
                  if (found) setForm(prev => ({ ...prev, category: found.name, category_slug: found.slug }));
                }}
              >
                <SelectTrigger className="bg-background"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {existingCategories.map(c => (
                    <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" size="icon" variant="outline" onClick={() => setAddingNewCategory(true)} title="Add new category">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Category Slug</Label>
          <Input name="category_slug" value={form.category_slug} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Price (GH₵)</Label>
          <Input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch checked={form.featured} onCheckedChange={(v) => setForm(prev => ({ ...prev, featured: v }))} />
          <Label>Featured</Label>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea name="description" value={form.description} onChange={handleChange} rows={3} />
      </div>

      <div className="space-y-1.5">
        <Label>Long Description</Label>
        <Textarea name="long_description" value={form.long_description} onChange={handleChange} rows={4} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Material</Label>
          <Input name="material" value={form.material} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label>Color</Label>
          <Input name="color" value={form.color} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label>Finish</Label>
          <Input name="finish" value={form.finish} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Dimensions</Label>
          <Input name="dimensions" value={form.dimensions} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label>Weight</Label>
          <Input name="weight" value={form.weight} onChange={handleChange} />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <Label>Images</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 border rounded overflow-hidden group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:border-foreground/40 transition-colors">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
            <span className="text-xs text-muted-foreground mt-1">Upload</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUploadImages} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default AdminProductForm;
