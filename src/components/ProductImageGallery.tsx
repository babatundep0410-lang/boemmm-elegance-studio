import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollCooldown = useRef(false);
  const isMobile = useIsMobile();

  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 1;
  const showScrollBar = totalImages > 1;

  // Preload all images on mount
  useEffect(() => {
    if (!hasImages) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images, hasImages]);

  // Desktop: debounced wheel handler inside image area only
  const handleImageAreaWheel = useCallback((e: React.WheelEvent) => {
    if (!showScrollBar) return;
    e.preventDefault();
    e.stopPropagation();

    if (scrollCooldown.current) return;
    scrollCooldown.current = true;

    if (e.deltaY > 0) {
      setActiveIndex(prev => Math.min(prev + 1, totalImages - 1));
    } else if (e.deltaY < 0) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }

    setTimeout(() => { scrollCooldown.current = false; }, 400);
  }, [showScrollBar, totalImages]);

  // Mobile: swipe handling
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (diff > threshold) {
      setActiveIndex(prev => Math.min(prev + 1, totalImages - 1));
    } else if (diff < -threshold) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
    touchStart.current = null;
  }, [totalImages]);

  // ── Mobile layout ──
  if (isMobile) {
    return (
      <div className="w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '60vh' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {hasImages ? (
            <>
              {/* Render all images absolutely positioned for instant switching */}
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${productName}${totalImages > 1 ? ` - view ${i + 1}` : ''}`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-contain image-sharp transition-opacity duration-300 p-4",
                    i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  loading="eager"
                  decoding="sync"
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              ))}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Product imagery coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile dot indicators */}
        {showScrollBar && (
          <div className="flex items-center justify-center gap-2 py-4">
            {Array.from({ length: totalImages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-1.5 h-1.5 bg-foreground/60"
                    : "w-1 h-1 bg-foreground/20"
                )}
                aria-label={`View image ${index + 1} of ${totalImages}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Desktop layout ──
  return (
    <div className="relative lg:h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="relative flex items-start max-w-[85%] gap-[2cm]" style={{ height: '70vh' }}>
          {/* Scrollbar — fixed height, tap-only */}
          {showScrollBar && (
            <div className="w-[3px] flex flex-col shrink-0" style={{ height: '70vh' }}>
              {Array.from({ length: totalImages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex-1 transition-colors duration-300",
                    index === activeIndex
                      ? "bg-foreground/70"
                      : "bg-foreground/15 hover:bg-foreground/30"
                  )}
                  aria-label={`View image ${index + 1} of ${totalImages}`}
                />
              ))}
            </div>
          )}

          {/* Image area — all images stacked, opacity-switched for zero loading */}
          <div
            onWheel={handleImageAreaWheel}
            className="relative flex items-center justify-center"
            style={{ height: '70vh', width: '100%' }}
          >
            {hasImages ? (
              images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${productName}${totalImages > 1 ? ` - view ${i + 1}` : ''}`}
                  className={cn(
                    "absolute max-w-full max-h-full object-contain image-sharp border border-foreground/80 transition-opacity duration-300",
                    i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  loading="eager"
                  decoding="sync"
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Technical drawing - Product view</p>
                  <p className="text-xs mt-1 opacity-60">Product imagery coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
