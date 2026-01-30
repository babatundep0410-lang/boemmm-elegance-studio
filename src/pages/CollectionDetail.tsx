import { Link, useParams } from 'react-router-dom';
import { getProductsByCollection } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const CollectionDetail = () => {
  const { collectionSlug } = useParams();
  const products = getProductsByCollection(collectionSlug || '');

  // For now, only Wrought L'émeute exists
  const isWroughtLemute = collectionSlug === 'wrought-lemute';

  if (!isWroughtLemute) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            The Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Wrought L'émeute
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A celebration of wrought iron artistry, where ancient West African blacksmithing 
            traditions meet contemporary design vision. Each piece is hand-forged, 
            bearing the unique marks of its maker.
          </p>
        </div>
      </section>

      {/* Collection Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">The Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              "L'émeute" speaks to emergence—the rising of new forms from ancient traditions. 
              This collection began with a question: What happens when centuries-old ironworking 
              techniques meet the demands of contemporary living?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The answer is furniture that commands attention through restraint. Bold geometric 
              forms executed with precision. Surfaces that reveal the hand of the maker. 
              Pieces designed to anchor spaces and endure generations.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">The Craft</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each piece in Wrought L'émeute is forged by master artisans in our Accra workshop. 
              The iron is heated in traditional forges, shaped by hand, and finished with 
              techniques passed down through generations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is not industrial production—it is craft. Every curve, every joint, every 
              surface bears the intentional marks of human hands. No two pieces are identical; 
              each carries its own subtle character.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
            The Pieces
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/collections/${product.collectionSlug}/${product.categorySlug}`}
                className="group bg-background p-6"
              >
                <div className="aspect-[4/3] bg-muted mb-6 flex items-center justify-center overflow-hidden">
                  <span className="text-muted-foreground text-sm">
                    Product image placeholder
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-accent group-hover:gap-4 transition-all">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          Experience in Person
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Visit our showroom in Accra to experience the Wrought L'émeute collection 
          firsthand, or schedule a virtual consultation with our design team.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
        >
          Schedule a Visit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default CollectionDetail;
