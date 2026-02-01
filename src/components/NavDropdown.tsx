import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  name: string;
  href: string;
}

interface Collection {
  name: string;
  href: string;
  products?: Product[];
}

interface SimpleLink {
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: Collection[] | SimpleLink[];
  hasSubmenus?: boolean;
}

export const NavDropdown = ({ label, items, hasSubmenus = false }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuEnter = (href: string) => {
    setActiveSubmenu(href);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={cn(
          "nav-link py-2 flex items-center gap-1.5 transition-colors duration-200",
          isOpen ? "text-foreground" : "text-foreground/90 hover:text-foreground"
        )}
      >
        <span className="relative">
          {label}
          <span className={cn(
            "absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out",
            isOpen ? "w-full" : "w-0"
          )} />
        </span>
      </button>

      {/* Dropdown Panel */}
      <div 
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out z-[100]",
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-1 pointer-events-none"
        )}
      >
        <div className="relative">
          {/* Subtle arrow indicator */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-background border-l border-t border-border" />
          
          <div className={cn(
            "bg-background/98 backdrop-blur-sm border border-border/80 shadow-xl",
            "min-w-[180px] overflow-hidden",
            hasSubmenus && activeSubmenu && "flex"
          )}>
            {/* Main menu items */}
            <div className="py-2">
              {items.map((item) => {
                const hasProducts = hasSubmenus && 'products' in item && item.products && item.products.length > 0;
                
                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => hasProducts && handleSubmenuEnter(item.href)}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between px-5 py-2.5 text-sm transition-all duration-150",
                        "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                        activeSubmenu === item.href && "text-foreground bg-muted/30"
                      )}
                    >
                      <span className="font-serif tracking-wide">{item.name}</span>
                      {hasProducts && (
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Submenu panel */}
            {hasSubmenus && activeSubmenu && (
              <div className={cn(
                "border-l border-border/60 bg-muted/20 py-2 min-w-[160px]",
                "animate-in fade-in-0 slide-in-from-left-2 duration-200"
              )}>
                {(items as Collection[])
                  .find(c => c.href === activeSubmenu)
                  ?.products?.map((product) => (
                    <Link
                      key={product.href}
                      to={product.href}
                      className="block px-5 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-150"
                    >
                      {product.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
