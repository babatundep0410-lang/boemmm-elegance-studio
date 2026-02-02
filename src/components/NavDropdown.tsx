import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    }, 80);
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
      {/* Trigger - matches nav-link exactly */}
      <button 
        className={cn(
          "nav-link py-2 text-foreground/90 hover:text-foreground transition-colors duration-200"
        )}
      >
        {label}
      </button>

      {/* Dropdown - unfolds seamlessly from trigger */}
      <div 
        className={cn(
          "absolute top-full left-0 pt-1 z-[100]",
          "transition-all duration-200 ease-out origin-top",
          isOpen 
            ? "opacity-100 scale-y-100 pointer-events-auto" 
            : "opacity-0 scale-y-95 pointer-events-none"
        )}
      >
        <div className={cn(
          "bg-background/95 backdrop-blur-sm",
          hasSubmenus && activeSubmenu && "flex"
        )}>
          {/* Main menu items - same style as nav-link */}
          <div className="flex flex-col gap-1 py-2">
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
                      "nav-link relative block py-1.5 text-foreground/70 hover:text-foreground",
                      "whitespace-nowrap",
                      activeSubmenu === item.href && "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Submenu panel - continues the same language */}
          {hasSubmenus && activeSubmenu && (
            <div className="flex flex-col gap-1 py-2 pl-6 border-l border-border/20">
              {(items as Collection[])
                .find(c => c.href === activeSubmenu)
                ?.products?.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="nav-link relative block py-1.5 text-foreground/70 hover:text-foreground whitespace-nowrap"
                  >
                    {product.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
