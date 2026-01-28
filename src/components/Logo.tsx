import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <a href="/" className="logo-text text-foreground tracking-[0.35em]">
        BOEMMM
      </a>
    </div>
  );
};
