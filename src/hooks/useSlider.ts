import { useState, useEffect, useCallback } from 'react';

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

  return {
    currentSlide,
    isTransitioning,
    direction,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
