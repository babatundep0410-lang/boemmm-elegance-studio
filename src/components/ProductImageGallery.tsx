import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 1;
  const showScrollBar = totalImages > 1;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!showScrollBar) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY > 0) {
      setActiveIndex(prev => Math.min(prev + 1, totalImages - 1));
    } else if (e.deltaY < 0) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
  }, [showScrollBar, totalImages]);

  return (
    <div
      ref={containerRef}
      className="relative lg:h-screen flex"
      onWheel={handleWheel}
    >
      {/* Left-edge segmented scrollbar — flush with image window */}
      {showScrollBar && (
        <div className="absolute left-0 top-0 bottom-0 z-10 w-[3px] flex flex-col">
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

      {/* Single image container */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        {hasImages ? (
          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
            className="max-w-[85%] max-h-[85%] object-contain image-sharp border border-foreground/80"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        ) : (
          <div className="w-[85%] h-[85%] flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Technical drawing - Product view</p>
              <p className="text-xs mt-1 opacity-60">Product imagery coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
