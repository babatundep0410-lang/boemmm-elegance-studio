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
            We create for those who understand that the most extraordinary things 
            in a room are rarely the loudest.
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
                West Africa has always produced artists who understood that beauty does not require 
                an audience to validate it. It simply exists — certain, unhurried, complete. That is 
                the sensibility BÖEMMM was built upon.
              </p>
              <p>
                We occupy the space where art and function become indistinguishable from one another. 
                Our pieces are made to be lived with — and yet they retain something most furniture 
                never achieves: the ability to stop you. A BÖEMMM piece does not settle into a room. 
                It holds it.
              </p>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Artistry with Intention</h4>
                <p>
                  We do not begin with function and arrive at beauty. We begin with both — and do not 
                  rest until they are one thing. Every piece draws from architectural history, sculptural 
                  tradition, and the visual language of cultures that have always understood form as feeling. 
                  The result is work that resists easy categorisation.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Conscious Craftsmanship</h4>
                <p>
                  The making of a BÖEMMM piece is inseparable from its meaning.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Ethical Sourcing</strong>: Every material is chosen for its character as much as its quality.</li>
                  <li><strong>Sustainability</strong>: We work at a pace that respects both the craft and the earth.</li>
                  <li><strong>Local Artistry</strong>: We create with West African artisans whose skills carry centuries of knowledge. That lineage is visible in the work.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg text-foreground mb-2">Impact Through Design</h4>
                <p>
                  A portion of every purchase supports social and environmental initiatives. To own a 
                  BÖEMMM piece is to participate in something larger than a transaction.
                </p>
              </div>
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
