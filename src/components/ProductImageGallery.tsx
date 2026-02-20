import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const scrollCooldown = useRef(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isMobile = useIsMobile();

  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 1;
  const showScrollBar = totalImages > 1;

  // Preload all images on mount for instant transitions
  useEffect(() => {
    if (!hasImages) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images, hasImages]);

  // Auto-scroll through images
  useEffect(() => {
    if (totalImages <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalImages]);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      setActiveIndex(prev => Math.min(prev + 1, totalImages - 1));
    } else if (touchDeltaX.current > threshold) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
    touchDeltaX.current = 0;
  }, [totalImages]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '55vh' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hasImages ? (
            <img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
              className="w-full h-full object-contain image-sharp transition-opacity duration-300"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Product imagery coming soon</p>
              </div>
            </div>
          )}
        </div>
        {/* Dot indicators */}
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

  // Desktop layout
  return (
    <div className="relative lg:h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="relative max-w-[85%]" style={{ height: '70vh' }}>
          {showScrollBar && (
            <div className="absolute left-0 top-0 w-[3px] flex flex-col" style={{ height: '70vh' }}>
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
          <div
            ref={imageAreaRef}
            onWheel={handleImageAreaWheel}
            className="flex items-center justify-center"
            style={{ height: '70vh', paddingLeft: showScrollBar ? 'calc(3px + 2cm)' : '0' }}
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
