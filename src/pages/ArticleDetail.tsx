import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useArticles, useArticleBySlug } from '@/hooks/useArticles';

/** Convert plain text or HTML content to display-ready HTML */
const formatContent = (raw: string): string => {
  const trimmed = raw.trim();
  // If content already contains HTML tags, return as-is
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  // Otherwise treat as plain text with markdown-style ## headings
  return trimmed
    .split(/\n\s*\n/) // split on blank lines → paragraphs
    .map((block) => {
      const b = block.trim();
      if (b.startsWith('## ')) return `<h2>${b.slice(3)}</h2>`;
      return `<p>${b.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');
};

const ArticleDetail = () => {
  const { articleSlug } = useParams();
  const { data: article, isLoading } = useArticleBySlug(articleSlug || '');
  const { data: articles = [] } = useArticles();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Article Not Found</h1>
          <Link to="/about/articles" className="text-accent hover:underline">
            View all articles
          </Link>
        </div>
      </div>
    );
  }

  // Find next and previous articles
  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Link */}
      <nav className="max-w-4xl mx-auto px-6 lg:px-12 py-4">
        <Link
          to="/about/articles"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Articles
        </Link>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 lg:px-12 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
          {article.category}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>{article.author}</span>
          <span>•</span>
          <span>{formatDate(article.published_at)}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-16">
        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-muted-foreground text-sm">
              Featured image placeholder
            </span>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 lg:px-12 pb-24">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
        />
      </article>

      {/* Article Navigation */}
      <nav className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {prevArticle ? (
              <Link
                to={`/about/articles/${prevArticle.slug}`}
                className="group"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" />
                  Previous Article
                </p>
                <h3 className="font-serif text-lg group-hover:text-accent transition-colors">
                  {prevArticle.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            
            {nextArticle && (
              <Link
                to={`/about/articles/${nextArticle.slug}`}
                className="group text-right"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center justify-end gap-2">
                  Next Article
                  <ArrowRight className="w-3 h-3" />
                </p>
                <h3 className="font-serif text-lg group-hover:text-accent transition-colors">
                  {nextArticle.title}
                </h3>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ArticleDetail;
