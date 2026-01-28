import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SlideContent, Slide } from "./SlideContent";
import { SlideIndicators } from "./SlideIndicators";
import { useSlider } from "@/hooks/useSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images
import slideDining from "@/assets/slide-dining.png";
import slideOcean from "@/assets/slide-ocean.png";
import slideLounge from "@/assets/slide-lounge.png";
import slideMirror from "@/assets/slide-mirror.png";

const slides: Slide[] = [
  {
    id: 1,
    image: slideDining,
    title: "The Accra Collection",
    subtitle: "Where Modern Design Meets African Heritage",
    collection: "New Arrival",
  },
  {
    id: 2,
    image: slideOcean,
    title: "Serenity Table",
    subtitle: "Sculpted Metal & Glass",
    collection: "Living Collection",
  },
  {
    id: 3,
    image: slideLounge,
    title: "Essence Lounge",
    subtitle: "Timeless Comfort, Refined Elegance",
    collection: "Signature Pieces",
  },
  {
    id: 4,
    image: slideMirror,
    title: "Heritage Mirror",
    subtitle: "Artisanal Ironwork from West Africa",
    collection: "Décor",
  },
];

export const HeroSlider = () => {
  const { currentSlide, goToSlide, nextSlide, prevSlide, isTransitioning } = useSlider({
    totalSlides: slides.length,
    autoPlayInterval: 6000,
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Header - Logo & Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-8 pb-4">
        <Logo className="mb-6" />
        <Navigation className="hidden md:flex" />
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-center">
          <button className="nav-link text-foreground/90 hover:text-foreground">
            Menu
          </button>
        </div>
      </header>

      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <SlideContent
            key={slide.id}
            slide={slide}
            isActive={currentSlide === index}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={cn(
          "absolute left-6 top-1/2 -translate-y-1/2 z-40",
          "w-12 h-12 flex items-center justify-center",
          "text-primary-foreground/60 hover:text-primary-foreground",
          "transition-all duration-medium hover:scale-110",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1} />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 z-40",
          "w-12 h-12 flex items-center justify-center",
          "text-primary-foreground/60 hover:text-primary-foreground",
          "transition-all duration-medium hover:scale-110",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
        <SlideIndicators
          total={slides.length}
          current={currentSlide}
          onSelect={goToSlide}
        />
      </div>

      {/* Subtle corner branding */}
      <div className="absolute bottom-8 right-8 z-40 hidden lg:block">
        <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/40 font-sans">
          Accra, West Africa
        </p>
      </div>
    </div>
  );
};
