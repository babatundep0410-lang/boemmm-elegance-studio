import '@google/model-viewer';
import { useState } from 'react';
import { useProducts, toProductView, type ProductView } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/formatPrice';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, View, Smartphone } from 'lucide-react';

/**
 * Maps product category to a free sample GLB model.
 * Replace these URLs with your own hosted GLB files for real products.
 */
const MODEL_MAP: Record<string, string> = {
  dining: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  side: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  centre: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  mirror: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
};

function getCategoryKey(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('dining')) return 'dining';
  if (s.includes('side')) return 'side';
  if (s.includes('centre') || s.includes('center')) return 'centre';
  if (s.includes('mirror')) return 'mirror';
  return 'dining';
}

export default function ModelViewerAR() {
  const { data: dbProducts, isLoading } = useProducts();
  const products = (dbProducts || []).map(toProductView);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { addItem } = useCart();

  const selected: ProductView | null = products[selectedIdx] || null;
  const categoryKey = selected ? getCategoryKey(selected.categorySlug) : 'dining';
  const modelSrc = MODEL_MAP[categoryKey] || MODEL_MAP.dining;

  const handleAddToCart = () => {
    if (!selected) return;
    addItem({
      id: selected.id,
      name: selected.name,
      price: selected.price,
      image: selected.images[0] || '',
      collection: selected.collection,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full aspect-square flex items-center justify-center bg-muted/20 border border-border">
        <p className="text-muted-foreground text-sm animate-pulse">Loading products…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full aspect-square flex items-center justify-center bg-muted/20 border border-border">
        <p className="text-muted-foreground text-sm">No products available</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Model Viewer */}
      <div className="relative w-full aspect-square bg-muted/10 border border-border overflow-hidden">
        {/* @ts-expect-error model-viewer web component */}
        <model-viewer
          src={modelSrc}
          poster={selected?.images[0] || ''}
          alt={selected?.name || 'Furniture piece'}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1"
          environment-image="neutral"
          style={{
            width: '100%',
            height: '100%',
            '--poster-color': 'transparent',
          } as React.CSSProperties}
        >
          {/* AR button slot — only visible on AR-capable devices */}
          <button
            slot="ar-button"
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors z-20 border border-border"
          >
            <Smartphone className="w-4 h-4" />
            View in Your Space
          </button>

          {/* Loading indicator */}
          <div slot="progress-bar" className="w-full h-1 bg-muted absolute bottom-0 left-0">
            <div className="h-full bg-accent transition-all" style={{ width: '0%' }} />
          </div>
        {/* @ts-expect-error model-viewer web component closing */}
        </model-viewer>

        {/* Always-visible AR prompt for desktop users */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 bg-foreground/90 text-background text-xs uppercase tracking-[0.15em] z-20 border border-border backdrop-blur-sm pointer-events-none">
          <Smartphone className="w-4 h-4" />
          <span>Open on mobile to view in your space</span>
        </div>

        {/* Product info overlay */}
        {selected && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-border p-4 max-w-[220px] z-10">
            {selected.images[0] && (
              <div className="w-full aspect-square mb-3 overflow-hidden bg-muted">
                <img src={selected.images[0]} alt={selected.name} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
              {selected.collection}
            </p>
            <h3 className="font-serif text-sm text-foreground leading-snug mb-1">
              {selected.name}
            </h3>
            <p className="text-sm font-medium text-foreground mb-2">
              {formatPrice(selected.price)}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
              {selected.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-wider hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag className="w-3 h-3" />
                Add to Cart
              </button>
              <Link
                to={`/collections/${selected.collectionSlug}/${selected.categorySlug}`}
                className="flex items-center justify-center px-2 py-1.5 border border-border text-foreground hover:bg-muted transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Interaction hint */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-muted-foreground bg-background/70 backdrop-blur-sm px-3 py-1.5 border border-border z-10">
          <View className="w-3.5 h-3.5" />
          Drag to rotate · Pinch to zoom
        </div>
      </div>

      {/* Product selector */}
      <div className="flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
        {products.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedIdx(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase transition-all border whitespace-nowrap flex-shrink-0 ${
              selectedIdx === idx
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-foreground border-border hover:bg-foreground hover:text-background'
            }`}
          >
            {p.images[0] && (
              <img src={p.images[0]} alt="" className="w-5 h-5 object-cover rounded-sm" />
            )}
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
