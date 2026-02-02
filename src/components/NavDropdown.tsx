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
    }, 100);
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
          "nav-link py-2 transition-colors duration-200",
          isOpen ? "text-foreground" : "text-foreground/90 hover:text-foreground"
        )}
      >
        {label}
      </button>

      {/* Dropdown Panel */}
      <div 
        className={cn(
          "absolute top-full left-0 pt-2 z-[100]",
          "transition-opacity duration-150",
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className={cn(
          "bg-background border border-border/60",
          "min-w-[160px]",
          hasSubmenus && activeSubmenu && "flex"
        )}>
          {/* Main menu items */}
          <div className="py-3">
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
                      "group relative flex items-center justify-between px-5 py-2 text-sm",
                      "text-foreground/70 hover:text-foreground transition-colors duration-150",
                      activeSubmenu === item.href && "text-foreground"
                    )}
                  >
                    <span className="relative tracking-wide">
                      {item.name}
                      <span className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-200",
                        "w-0 group-hover:w-full",
                        activeSubmenu === item.href && "w-full"
                      )} />
                    </span>
                    {hasProducts && (
                      <ChevronRight className="w-3 h-3 ml-3 opacity-40" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Submenu panel */}
          {hasSubmenus && activeSubmenu && (
            <div className="border-l border-border/40 py-3 min-w-[140px]">
              {(items as Collection[])
                .find(c => c.href === activeSubmenu)
                ?.products?.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="group relative block px-5 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-150"
                  >
                    <span className="relative">
                      {product.name}
                      <span className="absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-200 w-0 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
