import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SubItem {
  name: string;
  href: string;
}

interface Collection {
  name: string;
  href: string;
  products?: SubItem[];
  categories?: SubItem[];
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
      {/* Trigger - uses nav-link for underline effect */}
      <button className="nav-link py-2 text-foreground/90 hover:text-foreground">
        {label}
      </button>

      {/* Dropdown */}
      <div 
        className={cn(
          "absolute top-full left-0 pt-4 z-[100]",
          "transition-opacity duration-150",
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className={cn(
          "bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg p-4 min-w-[180px]",
          hasSubmenus && activeSubmenu && "flex gap-8"
        )}>
          {/* Primary items - same nav-link styling */}
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const subItems = hasSubmenus && 'categories' in item ? item.categories : ('products' in item ? item.products : undefined);
              const hasProducts = hasSubmenus && subItems && subItems.length > 0;
              
              return (
                <div
                  key={item.href}
                  onMouseEnter={() => hasProducts && handleSubmenuEnter(item.href)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "nav-link text-foreground/60 hover:text-foreground",
                      activeSubmenu === item.href && "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Submenu - continues as vertical text */}
          {hasSubmenus && activeSubmenu && (
            <div className="flex flex-col gap-3">
              {(() => {
                const col = (items as Collection[]).find(c => c.href === activeSubmenu);
                const subs = col?.categories || col?.products || [];
                return subs.map((sub) => (
                  <Link
                    key={sub.href}
                    to={sub.href}
                    className="nav-link text-foreground/60 hover:text-foreground"
                  >
                    {sub.name}
                  </Link>
                ));
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
