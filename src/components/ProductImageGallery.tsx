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

  // Pinch-to-zoom state for mobile
  const [pinchScale, setPinchScale] = useState(1);
  const [pinchOrigin, setPinchOrigin] = useState({ x: 50, y: 50 });
  const initialPinchDistance = useRef(0);
  const initialPinchScale = useRef(1);
  const isPinching = useRef(false);

  const hasImages = images.length > 0;
  const totalImages = hasImages ? images.length : 1;
  const showScrollBar = totalImages > 1;

  useEffect(() => {
    if (!hasImages) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images, hasImages]);

  useEffect(() => {
    setIsZoomed(false);
    setPinchScale(1);
  }, [activeIndex]);

  const handleImageClick = useCallback(() => {
    if (isMobile) return; // mobile uses pinch
    setIsZoomed(prev => !prev);
    setZoomPosition({ x: 50, y: 50 });
  }, [isMobile]);

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

  // Mobile touch handlers with pinch-to-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      isPinching.current = true;
      initialPinchDistance.current = getTouchDistance(e.touches);
      initialPinchScale.current = pinchScale;
      const rect = e.currentTarget.getBoundingClientRect();
      const midX = ((e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left) / rect.width * 100;
      const midY = ((e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top) / rect.height * 100;
      setPinchOrigin({ x: midX, y: midY });
    } else if (e.touches.length === 1 && pinchScale <= 1) {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    }
  }, [pinchScale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching.current) {
      e.preventDefault();
      const dist = getTouchDistance(e.touches);
      const scale = Math.min(Math.max(initialPinchScale.current * (dist / initialPinchDistance.current), 1), 4);
      setPinchScale(scale);
    } else if (e.touches.length === 1 && pinchScale <= 1) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  }, [pinchScale]);

  const handleTouchEnd = useCallback(() => {
    if (isPinching.current) {
      isPinching.current = false;
      if (pinchScale <= 1.1) setPinchScale(1);
      return;
    }
    if (pinchScale > 1) return; // don't swipe while zoomed
    const threshold = 50;
    if (touchDeltaX.current < -threshold) goToNext();
    else if (touchDeltaX.current > threshold) goToPrev();
    touchDeltaX.current = 0;
  }, [goToNext, goToPrev, pinchScale]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '55vh', touchAction: 'pan-x pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hasImages ? (
            <img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
              className="w-full h-full object-contain image-sharp transition-transform duration-200"
              style={{
                transform: `scale(${pinchScale})`,
                transformOrigin: `${pinchOrigin.x}% ${pinchOrigin.y}%`,
              }}
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
          {/* Double-tap to reset zoom */}
          {pinchScale > 1 && (
            <button
              onClick={() => setPinchScale(1)}
              className="absolute bottom-3 right-3 text-xs bg-foreground/60 text-background px-2 py-1 rounded"
            >
              Reset zoom
            </button>
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
    <>
      {/* Zoom overlay */}
      {isZoomed && hasImages && (
        <div
          className="fixed inset-0 z-50 bg-background/95 cursor-crosshair"
          onClick={handleImageClick}
          onMouseMove={(e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setZoomPosition({ x, y });
          }}
        >
          <img
            src={images[activeIndex]}
            alt={productName}
            className="w-full h-full object-contain transition-none"
            style={{
              transform: 'scale(2.5)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
          <div className="absolute top-6 right-6 text-xs text-foreground/50">Click to close</div>
        </div>
      )}

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
                <img
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={`${productName}${totalImages > 1 ? ` - view ${activeIndex + 1}` : ''}`}
                  className="max-w-full max-h-full object-contain image-sharp border border-foreground/80 transition-opacity duration-300 cursor-zoom-in"
                  onClick={handleImageClick}
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

              {/* Up/Down arrow navigation */}
              {showScrollBar && (
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
    </>
  );
};

export default ProductImageGallery;
