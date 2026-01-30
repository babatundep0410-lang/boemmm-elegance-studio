import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const collections = [
  {
    name: "Wrought L'émeute",
    href: '/collections/wrought-lemute',
    products: [
      { name: 'Dining Tables', href: '/collections/wrought-lemute/dining-table' },
      { name: 'Centre Tables', href: '/collections/wrought-lemute/centre-table' },
      { name: 'Side Tables', href: '/collections/wrought-lemute/side-table' },
      { name: 'Mirrors', href: '/collections/wrought-lemute/mirror' },
    ],
  },
];

const aboutLinks = [
  { name: 'Our Story', href: '/about' },
  { name: 'Articles', href: '/about/articles' },
];

interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

const NavDropdown = ({ label, isOpen, onMouseEnter, onMouseLeave, children }: NavDropdownProps) => (
  <div
    className="relative"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <button className="nav-link text-foreground/90 hover:text-foreground py-2 flex items-center gap-1">
      {label}
      <ChevronDown className={cn(
        "w-3 h-3 transition-transform duration-300",
        isOpen && "rotate-180"
      )} />
    </button>
    <div className={cn(
      "absolute top-full left-0 pt-2 transition-all duration-300",
      isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
    )}>
      {children}
    </div>
  </div>
);

export const Header = () => {
  const location = useLocation();
  const { totalItems, setIsOpen: openCart } = useCart();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isHome ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b border-border/50"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <Link to="/" className="logo-text text-foreground tracking-[0.35em]">
            BOEMMM
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-12 pb-4">
          <Link to="/" className="nav-link text-foreground/90 hover:text-foreground py-2">
            Home
          </Link>

          {/* Collections Dropdown */}
          <NavDropdown
            label="Collections"
            isOpen={openDropdown === 'collections'}
            onMouseEnter={() => setOpenDropdown('collections')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className="bg-background border border-border shadow-lg min-w-[400px] flex">
              {/* Collections list */}
              <div className="w-1/2 p-4 border-r border-border">
                {collections.map((collection) => (
                  <Link
                    key={collection.href}
                    to={collection.href}
                    className="block py-2 text-sm font-serif text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
              {/* Products list */}
              <div className="w-1/2 p-4">
                {collections[0].products.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    className="block py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
          </NavDropdown>

          <Link to="/ar-experience" className="nav-link text-foreground/90 hover:text-foreground py-2">
            AR Experience
          </Link>

          {/* About Us Dropdown */}
          <NavDropdown
            label="About us"
            isOpen={openDropdown === 'about'}
            onMouseEnter={() => setOpenDropdown('about')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className="bg-background border border-border shadow-lg min-w-[180px] p-4">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </NavDropdown>

          <Link to="/contact" className="nav-link text-foreground/90 hover:text-foreground py-2">
            Contact us
          </Link>
        </nav>

        {/* Mobile Menu & Cart */}
        <div className="md:hidden flex items-center justify-between pb-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6 pt-12">
                <Link to="/" className="text-lg font-serif" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                
                <div>
                  <Link to="/collections" className="text-lg font-serif" onClick={() => setMobileMenuOpen(false)}>
                    Collections
                  </Link>
                  <div className="pl-4 mt-2 flex flex-col gap-2">
                    {collections.map((collection) => (
                      <div key={collection.href}>
                        <Link
                          to={collection.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {collection.name}
                        </Link>
                        <div className="pl-4 mt-1 flex flex-col gap-1">
                          {collection.products.map((product) => (
                            <Link
                              key={product.href}
                              to={product.href}
                              className="text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/ar-experience" className="text-lg font-serif" onClick={() => setMobileMenuOpen(false)}>
                  AR Experience
                </Link>

                <div>
                  <Link to="/about" className="text-lg font-serif" onClick={() => setMobileMenuOpen(false)}>
                    About us
                  </Link>
                  <div className="pl-4 mt-2 flex flex-col gap-2">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="text-lg font-serif" onClick={() => setMobileMenuOpen(false)}>
                  Contact us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <button onClick={() => openCart(true)} className="p-2 text-foreground relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Cart Icon */}
      <button
        onClick={() => openCart(true)}
        className="hidden md:flex fixed top-8 right-8 z-50 p-2 text-foreground hover:text-accent transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
};
