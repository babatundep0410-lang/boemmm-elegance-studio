import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ProductPage = () => {
  const { collectionSlug, categorySlug } = useParams();
  const product = getProductBySlug(collectionSlug || '', categorySlug || '');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link to="/collections" className="text-accent hover:underline">
            View all collections
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '',
        collection: product.collection,
      });
    }
    setQuantity(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Placeholder images array
  const images = product.images.length > 0 
    ? product.images 
    : [null, null, null]; // Placeholder slots

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/collections" className="hover:text-foreground transition-colors">
              Collections
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to={`/collections/${product.collectionSlug}`}
              className="hover:text-foreground transition-colors"
            >
              {product.collection}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted border border-border flex items-center justify-center">
              {images[activeImage] ? (
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground text-sm">
                    Product image placeholder
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    High-resolution imagery coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "aspect-square bg-muted border transition-all",
                    activeImage === idx
                      ? "border-foreground"
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">
                        View {idx + 1}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="font-serif text-3xl md:text-4xl mb-4">
              {product.name}
            </h1>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              {product.description}
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                Price
              </p>
              <p className="font-serif text-2xl">{formatPrice(product.price)}</p>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Specifications */}
            <ul className="space-y-2 mb-8 text-sm">
              <li className="flex">
                <span className="text-muted-foreground w-28">Material:</span>
                <span>{product.specifications.material}</span>
              </li>
              <li className="flex">
                <span className="text-muted-foreground w-28">Color:</span>
                <span>{product.specifications.color}</span>
              </li>
              <li className="flex">
                <span className="text-muted-foreground w-28">Dimensions:</span>
                <span>{product.specifications.dimensions}</span>
              </li>
              {product.specifications.weight && (
                <li className="flex">
                  <span className="text-muted-foreground w-28">Weight:</span>
                  <span>{product.specifications.weight}</span>
                </li>
              )}
              {product.specifications.finish && (
                <li className="flex">
                  <span className="text-muted-foreground w-28">Finish:</span>
                  <span>{product.specifications.finish}</span>
                </li>
              )}
            </ul>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-sm uppercase tracking-wider"
            >
              Add to cart
            </Button>

            {/* Accordions */}
            <Accordion type="single" collapsible className="mt-8 border-t border-border">
              <AccordionItem value="details" className="border-b border-border">
                <AccordionTrigger className="py-4 text-sm uppercase tracking-wider hover:no-underline">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">{product.description}</p>
                  <p>
                    Each piece is hand-forged in our Accra workshop, ensuring unique 
                    character and exceptional quality. Minor variations in texture and 
                    finish are signatures of authentic craftsmanship.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping" className="border-b border-border">
                <AccordionTrigger className="py-4 text-sm uppercase tracking-wider hover:no-underline">
                  Shipping
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">
                    We offer worldwide shipping on all orders. Delivery times vary 
                    by location:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ghana: 5-7 business days</li>
                    <li>West Africa: 7-14 business days</li>
                    <li>International: 14-28 business days</li>
                  </ul>
                  <p className="mt-3">
                    White glove delivery available for select locations. Contact us 
                    for details.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="returns" className="border-b border-border">
                <AccordionTrigger className="py-4 text-sm uppercase tracking-wider hover:no-underline">
                  Returns
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We accept returns within 30 days of delivery for items in original 
                    condition. Custom orders and made-to-order pieces are final sale. 
                    Please contact our customer service team to initiate a return.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
