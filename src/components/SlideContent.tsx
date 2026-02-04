import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  collection?: string;
  link?: string;
}

interface SlideContentProps {
  slide: Slide;
  isActive: boolean;
  className?: string;
}

export const SlideContent = ({ slide, isActive, className }: SlideContentProps) => {
  const content = (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={slide.image}
          alt={slide.title}
          className={cn(
            "w-full h-full object-cover",
            isActive && "ken-burns"
          )}
        />
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* Text Overlay */}
      <div 
        className={cn(
          "absolute bottom-24 left-12 md:left-20 lg:left-32 z-20",
          isActive ? "animate-fade-up" : "opacity-0"
        )}
        style={{ animationDelay: isActive ? "0.3s" : "0s" }}
      >
        {slide.collection && (
          <p 
            className="slide-subtitle text-primary-foreground/80 mb-4"
            style={{ animationDelay: "0.4s" }}
          >
            {slide.collection}
          </p>
        )}
        <h2 className="slide-title text-primary-foreground mb-6 whitespace-pre-line">
          {slide.title}
        </h2>
        <p className="slide-subtitle text-primary-foreground/70">
          {slide.subtitle}
        </p>
      </div>
    </>
  );

  const baseClasses = cn(
    "absolute inset-0 w-full h-full transition-opacity duration-slow",
    isActive ? "opacity-100 z-10" : "opacity-0 z-0",
    className
  );

  if (slide.link) {
    return (
      <Link
        to={slide.link}
        className={cn(baseClasses, "block cursor-pointer")}
        aria-label={`View ${slide.title}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
};
