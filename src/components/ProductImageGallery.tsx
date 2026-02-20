import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
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

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false);
  }, [activeIndex]);

  const handleImageClick = useCallback(() => {
    setIsZoomed(prev => !prev);
    setZoomPosition({ x: 50, y: 50 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, [isZoomed]);

  const goToPrev = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, totalImages - 1));
  }, [totalImages]);

  const handleImageAreaWheel = useCallback((e: React.WheelEvent) => {
    if (!showScrollBar || isZoomed) return;
    e.preventDefault();
    e.stopPropagation();

    if (scrollCooldown.current) return;
    scrollCooldown.current = true;

    if (e.deltaY > 0) goToNext();
    else if (e.deltaY < 0) goToPrev();

    setTimeout(() => { scrollCooldown.current = false; }, 400);
  }, [showScrollBar, isZoomed, goToNext, goToPrev]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) goToNext();
    else if (touchDeltaX.current > threshold) goToPrev();
    touchDeltaX.current = 0;
  }, [goToNext, goToPrev]);

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
            <div className="w-full h-full overflow-hidden">
              <img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
                className={cn(
                  "w-full h-full object-contain image-sharp transition-all duration-300",
                  isZoomed && "scale-[2.5] cursor-grab"
                )}
                style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Product imagery coming soon</p>
              </div>
            </div>
          )}
        </div>
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
            className="flex items-center justify-center relative"
            style={{ height: '70vh', paddingLeft: showScrollBar ? 'calc(3px + 2cm)' : '0' }}
          >
            {hasImages ? (
              <div className="relative overflow-hidden max-w-full max-h-full flex items-center justify-center">
                <img
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
                  className={cn(
                    "max-w-full max-h-[70vh] object-contain image-sharp border border-foreground/80 transition-all duration-300",
                    isZoomed ? "scale-[2.5] cursor-crosshair" : "cursor-zoom-in"
                  )}
                  style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                  onClick={handleImageClick}
                  onMouseMove={handleMouseMove}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Technical drawing - Product view</p>
                  <p className="text-xs mt-1 opacity-60">Product imagery coming soon</p>
                </div>
              </div>
            )}

            {/* Up/Down arrow navigation */}
            {showScrollBar && !isZoomed && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <button
                  onClick={goToPrev}
                  disabled={activeIndex === 0}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center transition-all duration-200",
                    activeIndex === 0
                      ? "text-foreground/15 cursor-default"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                  aria-label="Previous image"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={activeIndex === totalImages - 1}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center transition-all duration-200",
                    activeIndex === totalImages - 1
                      ? "text-foreground/15 cursor-default"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                  aria-label="Next image"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
