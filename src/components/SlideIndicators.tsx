import { cn } from "@/lib/utils";

interface SlideIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}

export const SlideIndicators = ({ 
  total, 
  current, 
  onSelect, 
  className 
}: SlideIndicatorsProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            "slide-dot rounded-full",
            index === current 
              ? "slide-dot-active" 
              : "slide-dot-inactive"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
