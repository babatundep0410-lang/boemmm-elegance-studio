import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

const navItems = [
  { label: "Collections", href: "#collections" },
  { label: "Living", href: "#living" },
  { label: "Dining", href: "#dining" },
  { label: "Bedroom", href: "#bedroom" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = ({ className }: NavigationProps) => {
  return (
    <nav className={cn("flex items-center justify-center gap-8 md:gap-12", className)}>
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="nav-link text-foreground/90 hover:text-foreground py-2"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};
