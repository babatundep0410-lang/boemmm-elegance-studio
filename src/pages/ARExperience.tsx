import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Scan, Move3D } from 'lucide-react';

const ARExperience = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Coming Soon
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              AR Experience
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Visualize BOEMMM furniture in your space before you buy. Our augmented 
              reality experience lets you see how each piece will look and fit in 
              your home, at true scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This feature is currently in development. Sign up to be notified when 
              it launches.
            </p>
          </div>
          
          <div className="aspect-square bg-muted flex items-center justify-center">
            <div className="text-center p-8">
              <Move3D className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">
                AR Preview Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
            How It Will Work
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Open on Your Device</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Access the AR experience directly from your smartphone or tablet. 
                No app download required—it works right in your browser.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Scan Your Space</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Point your camera at your room. The technology maps your space and 
                identifies the perfect placement for each piece.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Move3D className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Place & Explore</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Position the furniture, walk around it, and see exactly how it will 
                look in your home. True-to-scale, true-to-life visualization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="aspect-[4/3] bg-muted flex items-center justify-center order-2 lg:order-1">
            <span className="text-muted-foreground text-sm">
              Feature preview placeholder
            </span>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Confidence Before You Buy
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg mb-2">Perfect Fit</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  See exactly how a piece fits your space—its scale, proportions, 
                  and relationship to your existing furniture.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">Style Match</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluate how BOEMMM pieces complement your interior design, 
                  color palette, and overall aesthetic.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">Share & Decide</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Capture screenshots of the AR placement to share with family, 
                  friends, or your interior designer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Be the First to Experience
          </h2>
          <p className="text-background/70 max-w-xl mx-auto mb-8">
            Leave your email and we'll notify you the moment our AR experience 
            launches. Plus, get early access to new collections and exclusive offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-background/10 border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-background"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-background text-foreground text-sm uppercase tracking-wider hover:bg-background/90 transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* Browse Collections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          Explore Our Collections
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          While you wait for AR, explore our current collections and discover 
          pieces that will transform your space.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all"
        >
          View Collections
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default ARExperience;
