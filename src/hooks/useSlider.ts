import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

interface UseSliderProps {
  totalSlides: number;
  autoPlayInterval?: number;
  autoPlay?: boolean;
}

export const useSlider = ({ 
  totalSlides, 
  autoPlayInterval = 6000, 
  autoPlay = true 
}: UseSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }, [currentSlide, totalSlides, goToSlide]);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Touch swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return {
    currentSlide,
    isTransitioning,
    direction,
    goToSlide,
    nextSlide,
    prevSlide,
    containerRef,
  };
};
