import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import storyVideo from '@/assets/boemmm-story.mp4';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            About BÖEMMM
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We create furniture for those who believe that exceptional design 
            can emerge from anywhere—and that where it emerges matters.
          </p>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex items-center justify-center">
            <video
              src={storyVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[65vh] object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Our Philosophy</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                BÖEMMM was founded on a simple conviction: the world does not need 
                more furniture. It needs better furniture—pieces designed with 
                intention, crafted with care, built to last generations.
              </p>
              <p>
                We reject the cycle of disposable design. Our furniture is not 
                meant for seasons or trends. It is meant for lifetimes—to be 
                used, loved, and eventually passed on.
              </p>
              <p>
                Every piece we create embodies this philosophy. We choose materials 
                for their durability and beauty. We employ craftsmen who understand 
                their trade at the deepest level. We design forms that will feel 
                as fresh in fifty years as they do today.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center">
          What We Believe
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-xl mb-4">Craft Over Speed</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Excellence takes time. We will never compromise our standards for 
              faster production. Each piece is finished when it is ready—and not 
              a moment before.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Quality Over Quantity</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We make fewer pieces, but better ones. Our collections are focused, 
              intentional, and complete—not endless catalogs of variations.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Substance Over Style</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our designs serve real purposes. Beauty emerges from function, not 
              decoration. Every curve, every joint, every surface has a reason.
            </p>
          </div>
        </div>
      </section>

      {/* Team/Workshop Section */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">
                Our Workshop
              </h2>
              <div className="space-y-6 text-background/70 leading-relaxed">
                <p>
                  In our Accra workshop, traditional techniques meet modern precision. 
                  Here, master craftsmen who have dedicated their lives to their trade 
                  bring BÖEMMM designs to life.
                </p>
                <p>
                  Every piece passes through many hands before it reaches yours—each 
                  artisan contributing their expertise, each step subject to rigorous 
                  quality control. The result is furniture that meets the highest 
                  standards of excellence.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 text-background hover:gap-4 transition-all"
              >
                Visit Our Workshop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="aspect-video bg-background/10 flex items-center justify-center">
              <span className="text-background/50 text-sm">Workshop video placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          Explore Our Thinking
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Dive deeper into the ideas, craft, and culture that shape BÖEMMM through 
          our editorial articles.
        </p>
        <Link
          to="/about/articles"
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
        >
          Read Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default About;
