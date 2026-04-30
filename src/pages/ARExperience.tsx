import { Link } from 'react-router-dom';
import { ArrowRight, View } from 'lucide-react';

const ARExperience = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center">
        <div className="w-20 h-20 rounded-full bg-secondary/60 border border-border flex items-center justify-center mx-auto mb-10">
          <View className="w-9 h-9 text-accent" />
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-accent mb-5">
          Augmented Reality
        </p>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
          Coming Soon
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
          We're crafting an immersive AR experience that will let you place BÖEMMM
          pieces directly in your space — at true scale, in your own light.
          Stay with us; it arrives soon.
        </p>

        <Link
          to="/collections/wrought-lemute"
          className="inline-flex items-center gap-2 text-foreground hover:gap-4 transition-all text-sm uppercase tracking-wider border-b border-foreground/30 pb-1"
        >
          Explore the Collection
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ARExperience;
