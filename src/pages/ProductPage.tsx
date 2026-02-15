import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductBySlug, toProductView } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import ProductImageGallery from '@/components/ProductImageGallery';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const ProductPage = () => {
  const { collectionSlug, categorySlug } = useParams();
  const { data: dbProduct, isLoading } = useProductBySlug(collectionSlug || '', categorySlug || '');
  const product = dbProduct ? toProductView(dbProduct) : null;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price);

  return (
    <div className="min-h-screen bg-background overflow-y-auto scrollbar-none">
      <section className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,480px] min-h-screen">
          <ProductImageGallery images={product.images} productName={product.name} />

          <div className="px-6 lg:px-12 py-8 lg:py-16 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-l border-border">
            <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-6 leading-tight">{product.name}</h1>

            <div className="space-y-4 mb-10">
              <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">{product.longDescription}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-1">Price</p>
              <p className="text-foreground">{formatPrice(product.price)}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border/70">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground" aria-label="Decrease quantity">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-10 h-9 flex items-center justify-center text-sm text-foreground border-x border-border/70">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground" aria-label="Increase quantity">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <ul className="space-y-1 mb-8 text-sm text-muted-foreground">
              <li className="flex items-start"><span className="mr-2 text-xs">•</span><span>Crafted {product.specifications.material} {product.name}</span></li>
              <li className="flex items-start"><span className="mr-2 text-xs">•</span><span>Color: {product.specifications.color}</span></li>
              <li className="flex items-start"><span className="mr-2 text-xs">•</span><span>Material: {product.specifications.material}</span></li>
              <li className="flex items-start"><span className="mr-2 text-xs">•</span><span>Dimensions: {product.specifications.dimensions}</span></li>
            </ul>

            <Button onClick={handleAddToCart} className="bg-[#7a7a7a] hover:bg-[#6a6a6a] text-white text-sm px-6 py-2.5 h-auto rounded font-normal">
              Add to cart
            </Button>

            <Accordion type="single" collapsible className="mt-10 border-t border-border">
              <AccordionItem value="details" className="border-b border-border py-0">
                <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline">Product Details</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">{product.description}</p>
                  <p className="mb-3">Each piece is hand-forged in our Accra workshop, ensuring unique character and exceptional quality.</p>
                  <ul className="space-y-1 mt-4">
                    <li><span className="font-medium text-foreground">Material:</span> {product.specifications.material}</li>
                    <li><span className="font-medium text-foreground">Dimensions:</span> {product.specifications.dimensions}</li>
                    {product.specifications.weight && <li><span className="font-medium text-foreground">Weight:</span> {product.specifications.weight}</li>}
                    {product.specifications.finish && <li><span className="font-medium text-foreground">Finish:</span> {product.specifications.finish}</li>}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b border-border py-0">
                <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline">Shipping</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-3">We offer worldwide shipping on all orders.</p>
                  <ul className="space-y-1">
                    <li>• Ghana: 5-7 business days</li>
                    <li>• West Africa: 7-14 business days</li>
                    <li>• International: 14-28 business days</li>
                  </ul>
                  <p className="mt-3">White glove delivery available for select locations.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns" className="border-b border-border py-0">
                <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline">Returns</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  <p>We accept returns within 30 days of delivery for items in original condition. Custom orders are final sale.</p>
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
