import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Scan, Move3D, RotateCcw, View } from 'lucide-react';

const ModelViewerAR = lazy(() => import('@/components/ModelViewerAR'));

const ARExperience = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero — AR Model Viewer */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Augmented Reality
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              See It in Your Space
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Use your phone's camera to place BÖEMMM furniture directly in your room. 
              See how it fits, how it looks, and fall in love before you buy.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-accent" />
                <span>Drag to rotate · Pinch to zoom on mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" />
                <span>Tap "View in Your Space" on a supported device for AR</span>
              </div>
            </div>
            <div className="bg-muted/40 border border-border p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1 text-sm">AR Supported Devices</p>
              <p>
                <strong>Android:</strong> Chrome with ARCore · <strong>iOS:</strong> Safari with AR Quick Look
              </p>
            </div>
          </div>

          {/* AR Viewer */}
          <Suspense
            fallback={
              <div className="w-full aspect-square flex items-center justify-center bg-muted/20 border border-border">
                <div className="text-center">
                  <View className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3 animate-pulse" />
                  <p className="text-muted-foreground text-sm">Loading AR viewer…</p>
                </div>
              </div>
            }
          >
            <ModelViewerAR />
          </Suspense>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
            How AR Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">1. Choose a Piece</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Select any furniture piece from the selector below the viewer. 
                Browse dining tables, side tables, centre tables, and mirrors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">2. Tap "View in Your Space"</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                On a supported mobile device, tap the AR button to activate your camera. 
                The viewer uses ARCore (Android) or AR Quick Look (iOS).
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                <Move3D className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl mb-4">3. Place & Explore</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Point your camera at a flat surface. The furniture appears at real scale—walk 
                around it, move it, and see exactly how it fits your room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] bg-muted/20 border border-border flex items-center justify-center">
              <div className="text-center px-8">
                <Smartphone className="w-16 h-16 text-accent mx-auto mb-4 opacity-60" />
                <p className="font-serif text-xl mb-2 text-foreground">Try it on Mobile</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open this page on your phone to experience AR placement with your camera.
                </p>
              </div>
            </div>
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
                  and relationship to your existing furniture, at real-world size.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">True-to-Life Preview</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  AR uses your actual lighting conditions, so you see how BÖEMMM 
                  pieces look in your specific room environment.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">Share & Decide</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Screenshot the AR placement and share with family or your 
                  interior designer before making your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
