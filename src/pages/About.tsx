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
                At BÖEMMM, we believe that furniture should be more than just a functional object; it 
                should be a meaningful extension of your life and values. Our approach to design is rooted in 
                three core pillars:
              </p>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Artistry with Intention</h4>
                <p>
                  We view every piece as a "legacy reimagined". Drawing from generations of artistic 
                  influence, we blend contemporary aesthetics with classic sensibilities to create designs that 
                  are both enduring and inspiring.
                </p>
                <p className="mt-2">
                  For us, quality is uncompromising, and every detail serves a purpose in telling a larger story.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Conscious Craftsmanship</h4>
                <p>
                  Design transcends utility when it is paired with integrity. We are committed to a process that 
                  respects both the creator and the environment through:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Ethical Sourcing</strong>: Ensuring every material is chosen with care and responsibility.</li>
                  <li><strong>Sustainability</strong>: Prioritizing eco-friendly practices to protect the planet for future generations.</li>
                  <li><strong>Local Artistry</strong>: Partnering with skilled artisans to keep traditional craftsmanship alive in a modern world.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Impact Through Design</h4>
                <p>
                  A home should reflect a commitment to a better world. We believe in the power of collective 
                  change, which is why a portion of every purchase is dedicated to social and environmental 
                  initiatives. When you choose BÖEMMM, you aren't just furnishing a room—you are making 
                  a choice that makes a difference.
                </p>
              </div>

              <p className="italic">
                "Our goal is to create pieces that grow with you, becoming timeless additions to your story."
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
