import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Scan, Move3D, RotateCcw } from 'lucide-react';

const FurnitureViewer3D = lazy(() => import('@/components/FurnitureViewer3D'));

const ARExperience = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero — Interactive 3D viewer */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Interactive Experience
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Explore in 3D
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Interact with BÖEMMM furniture in full 3D. Rotate, zoom, and examine 
              every detail of our craftsmanship before you buy.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              <span>Drag to rotate&nbsp;&nbsp;·&nbsp;&nbsp;Scroll to zoom&nbsp;&nbsp;·&nbsp;&nbsp;Select a piece below</span>
            </div>
          </div>

          {/* 3D Viewer */}
          <div className="aspect-square bg-muted/30 border border-border overflow-hidden">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Move3D className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3 animate-pulse" />
                    <p className="text-muted-foreground text-sm">Loading 3D viewer…</p>
                  </div>
                </div>
              }
            >
              <FurnitureViewer3D />
            </Suspense>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Choose a Piece</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Select any furniture piece from the viewer above. Switch between 
                dining tables, side tables, centre tables, and mirrors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Rotate & Zoom</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Drag to orbit around the piece and scroll to zoom in on details. 
                Examine craftsmanship, proportions, and finish from every angle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Move3D className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">Visualize in Your Space</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get a true sense of scale and design. Picture how each BÖEMMM 
                piece will complement your interior before purchasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="aspect-[4/3] bg-muted/30 border border-border overflow-hidden order-2 lg:order-1">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Loading…</p>
                </div>
              }
            >
              <FurnitureViewer3D />
            </Suspense>
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
                  Evaluate how BÖEMMM pieces complement your interior design, 
                  color palette, and overall aesthetic.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">Every Detail</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Zoom in to appreciate the materials, finish quality, and 
                  craftsmanship that goes into each piece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Collections */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-background/70 max-w-xl mx-auto mb-8">
            Explore our full collections and find the perfect piece for your home.
          </p>
          <Link
            to="/collections/ocean-luxe"
            className="inline-flex items-center gap-2 text-background/80 hover:text-background hover:gap-4 transition-all text-sm uppercase tracking-wider"
          >
            Shop Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ARExperience;
