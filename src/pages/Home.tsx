import { SlideContent, Slide } from "@/components/SlideContent";
import { SlideIndicators } from "@/components/SlideIndicators";
import { NavDropdown } from "@/components/NavDropdown";
import { useSlider } from "@/hooks/useSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// Import images
import slideDining from "@/assets/slide-dining.png";
import slideOcean from "@/assets/slide-ocean.png";
import slideLounge from "@/assets/slide-lounge.png";
import slideMirror from "@/assets/slide-mirror.png";

const slides: Slide[] = [
  {
    id: 1,
    image: slideDining,
    title: "The Wrought L'émeute Collection",
    subtitle: "Where Modern Design Meets African Heritage",
    collection: "New Arrival",
  },
  {
    id: 2,
    image: slideOcean,
    title: "Serenity Table",
    subtitle: "Sculpted Metal & Glass",
    collection: "Living Collection",
  },
  {
    id: 3,
    image: slideLounge,
    title: "Essence Lounge",
    subtitle: "Timeless Comfort, Refined Elegance",
    collection: "Signature Pieces",
  },
  {
    id: 4,
    image: slideMirror,
    title: "Heritage Mirror",
    subtitle: "Artisanal Ironwork from West Africa",
    collection: "Décor",
  },
];

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

const Home = () => {
  const { currentSlide, goToSlide, nextSlide, prevSlide, isTransitioning } = useSlider({
    totalSlides: slides.length,
    autoPlayInterval: 6000,
  });
  const { totalItems, setIsOpen: openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Header - Logo & Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-8 pb-4">
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="logo-text text-foreground tracking-[0.35em]">
            BOEMMM
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-12">
          <Link to="/" className="nav-link text-foreground/90 hover:text-foreground py-2">
            Home
          </Link>

          <NavDropdown 
            label="Collections" 
            items={collections} 
            hasSubmenus 
          />

          <Link to="/ar-experience" className="nav-link text-foreground/90 hover:text-foreground py-2">
            AR Experience
          </Link>

          <NavDropdown 
            label="About us" 
            items={aboutLinks} 
          />

          <Link to="/contact" className="nav-link text-foreground/90 hover:text-foreground py-2">
            Contact us
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center px-6">
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
      </header>

      {/* Cart Icon - Desktop */}
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

      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <SlideContent
            key={slide.id}
            slide={slide}
            isActive={currentSlide === index}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={cn(
          "absolute left-6 top-1/2 -translate-y-1/2 z-40",
          "w-12 h-12 flex items-center justify-center",
          "text-primary-foreground/60 hover:text-primary-foreground",
          "transition-all duration-medium hover:scale-110",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1} />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 z-40",
          "w-12 h-12 flex items-center justify-center",
          "text-primary-foreground/60 hover:text-primary-foreground",
          "transition-all duration-medium hover:scale-110",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
        <SlideIndicators
          total={slides.length}
          current={currentSlide}
          onSelect={goToSlide}
        />
      </div>

      {/* Subtle corner branding */}
      <div className="absolute bottom-8 right-8 z-40 hidden lg:block">
        <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/40 font-sans">
          Accra, West Africa
        </p>
      </div>
    </div>
  );
};

export default Home;
