import { cn } from "@/lib/utils";
interface NavigationProps {
  className?: string;
}
const navItems = [{
  label: "Home",
  href: "#home"
}, {
  label: "Collection",
  href: "#collection"
}, {
  label: "AR Experience",
  href: "#ar-experience"
}, {
  label: "About us",
  href: "#about"
}, {
  label: "Contact",
  href: "#contact"
}];
export const Navigation = ({
  className
}: NavigationProps) => {
  return <nav className={cn("items-center justify-center gap-8 shadow-none flex flex-row md:gap-[52px]", className)}>
      {navItems.map(item => <a key={item.label} href={item.href} className="nav-link text-foreground/90 hover:text-foreground py-2">
          {item.label}
        </a>)}
    </nav>;
};