import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const scrollCooldown = useRef(false);

  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 1;
  const showScrollBar = totalImages > 1;

  // Debounced wheel handler — only fires inside the image area, one image per gesture
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

  return (
    <div className="relative lg:h-screen flex">
      {/* Single image container with adjacent scrollbar */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
    <div className="relative flex items-start max-w-[85%] gap-[2cm]" style={{ height: '70vh' }}>
          {/* Scrollbar — fixed height, tap-only, 2cm gap from image */}
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

          {/* Image — fixed container, wheel/trackpad scrolling only inside */}
          <div
            ref={imageAreaRef}
            onWheel={handleImageAreaWheel}
            className="flex items-center justify-center"
            style={{ height: '70vh' }}
          >
            {hasImages ? (
              <img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
                className="max-w-full max-h-full object-contain image-sharp border border-foreground/80 transition-opacity duration-300"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
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
