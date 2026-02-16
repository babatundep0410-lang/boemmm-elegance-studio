import { Link, useParams } from 'react-router-dom';
import { useProductsByCollection, toProductView } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';

const CollectionDetail = () => {
  const { collectionSlug } = useParams();
  const { data: dbProducts = [], isLoading } = useProductsByCollection(collectionSlug || '');
  const products = dbProducts.map(toProductView);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Collection Not Found</h1>
          <Link to="/collections" className="text-accent hover:underline">
            View all collections
          </Link>
        </div>
      </div>
    );
  }

  const collectionName = products[0]?.collection || collectionSlug;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{collectionName}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A celebration of wrought iron artistry, where ancient West African blacksmithing
            traditions meet contemporary design vision.
          </p>
        </div>
      </section>

      {/* Collection Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">The Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'émeute means riot.
              <br />
              Not chaos, but an uprising of form, craft, and intention.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This inaugural collection is crafted from wrought iron, drawing on centuries-old techniques refined for contemporary living. Each piece is formed by hand, guided by restraint. The geometry is deliberate. The surfaces carry the quiet imprint of the maker.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These pieces do not chase trends. They anchor rooms. They hold space. They are built to outlast moments and move easily between generations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wrought L'émeute is the quiet rebellion against the disposable.
              <br />
              A return to weight, craft, and permanence.
              <br />
              Furniture forged to endure, and designed to be lived with.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">The Craft</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each piece is forged by master artisans in our Accra workshop.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is not industrial production—it is craft. Every curve bears the intentional marks of human hands.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">The Pieces</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/collections/${product.collectionSlug}/${product.categorySlug}`}
                className="group bg-background p-6"
              >
                <div className="aspect-[4/3] bg-muted mb-6 flex items-center justify-center overflow-hidden">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm">No image</span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{product.category}</p>
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg">${product.price.toLocaleString()}</span>
                  <span className="inline-flex items-center gap-2 text-sm text-accent group-hover:gap-4 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - temporarily hidden, preserved for future restoration
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">Experience in Person</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Visit our showroom in Accra or schedule a virtual consultation.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors">
          Schedule a Visit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
      */}
    </div>
  );
};

export default CollectionDetail;
