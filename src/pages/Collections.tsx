import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCollections } from '@/hooks/useCollectionsCategories';

const Collections = () => {
  const { data: collections = [] } = useCollections();
  const featuredCollections = collections.filter(c => c.featured);
  const otherCollections = collections.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            Collections
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Each BÖEMMM collection tells a story of craft, heritage, and contemporary vision. 
            Our pieces are designed not for trends, but for lifetimes—furniture that grows 
            more beautiful with age and use.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe in the power of restraint. Each collection focuses on a singular 
            aesthetic vision, executed with uncompromising attention to detail and quality.
          </p>
        </div>
      </section>

      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid gap-12">
            {featuredCollections.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.slug}`}
                className="group relative bg-muted/50 min-h-[400px] md:min-h-[500px] flex items-end p-8 md:p-12 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-muted" />
                <div className="relative z-20 max-w-xl">
                  <p className="text-sm uppercase tracking-[0.2em] text-background/80 mb-4">
                    Featured Collection
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-background mb-4">
                    {col.name}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-background group-hover:gap-4 transition-all">
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Collections */}
      {otherCollections.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <h2 className="font-serif text-2xl md:text-3xl mb-8">All Collections</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherCollections.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.slug}`}
                className="group relative bg-muted/50 min-h-[250px] flex items-end p-6 md:p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-muted" />
                <div className="relative z-20">
                  <h3 className="font-serif text-2xl text-background mb-2">{col.name}</h3>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-background/80 group-hover:gap-4 transition-all">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Philosophy Section */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Design Philosophy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BÖEMMM furniture is designed to transcend time. We reject the cycle of 
                disposable design, creating pieces meant to be passed between generations.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our design language is global yet rooted—drawing from the rich craft 
                traditions of West Africa while speaking to contemporary spaces worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each collection emerges from a clear vision, developed slowly and 
                deliberately. We do not chase trends. We create legacies.
              </p>
            </div>
            <div className="aspect-[4/5] bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Image placeholder</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
