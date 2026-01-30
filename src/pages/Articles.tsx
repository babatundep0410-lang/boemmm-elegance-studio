import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { ArrowRight } from 'lucide-react';

const Articles = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Journal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            Articles
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explorations of craft, design philosophy, and the culture that shapes 
            BOEMMM. Our editorial pieces offer deeper insight into the thinking 
            behind our work.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 pb-24">
        <div className="grid gap-16">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/about/articles/${article.slug}`}
              className="group grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`aspect-[4/3] bg-muted flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Article image placeholder
                  </span>
                )}
              </div>
              
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                  {article.category}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(article.date)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-accent group-hover:gap-4 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-6">
            Stay Informed
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to receive new articles, collection announcements, and 
            insights from BOEMMM.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-background border border-border focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background text-sm uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Articles;
