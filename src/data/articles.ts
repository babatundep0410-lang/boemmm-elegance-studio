export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  category: string;
}

export const articles: Article[] = [
  {
    id: 'art-01',
    slug: 'craft-of-wrought-iron',
    title: 'The Craft of Wrought Iron',
    excerpt: 'Exploring the ancient art of ironwork and its place in contemporary design.',
    content: `
      <p>For centuries, West African blacksmiths have been the keepers of a sacred craft. The transformation of raw iron into objects of beauty and function was never merely industrial—it was spiritual, artistic, and deeply cultural.</p>
      
      <p>At BOEMMM, we honour this tradition while pushing its boundaries. Our artisans work with techniques passed down through generations, yet their creations speak to the contemporary world.</p>
      
      <p>Each piece in our Wrought L'émeute collection begins with fire and hammer. The metal is heated until it glows, then shaped with precise, deliberate strikes. This is not mass production—it is meditation made material.</p>
      
      <p>The result is furniture that carries the mark of its maker. Subtle variations in texture, the gentle undulation of hand-forged surfaces—these are not imperfections but signatures of authenticity.</p>
    `,
    author: 'BOEMMM Editorial',
    date: '2024-01-15',
    category: 'Craft',
  },
  {
    id: 'art-02',
    slug: 'design-philosophy',
    title: 'Less, But Better',
    excerpt: 'Our approach to design: restraint, quality, and timeless appeal.',
    content: `
      <p>In a world of endless options and disposable goods, BOEMMM chooses a different path. We believe in less—fewer pieces, made better, designed to last generations.</p>
      
      <p>This philosophy shapes everything we do, from material selection to the curves of a table leg. We ask: Is this necessary? Does it serve a purpose? Will it still be beautiful in twenty years?</p>
      
      <p>Our furniture is not trendy. It does not chase the styles of the moment. Instead, it draws from principles that transcend time: proportion, balance, quality of craft.</p>
      
      <p>When you bring a BOEMMM piece into your home, you are not just buying furniture. You are making a statement about values—about choosing quality over quantity, permanence over disposability.</p>
    `,
    author: 'BOEMMM Editorial',
    date: '2024-02-01',
    category: 'Philosophy',
  },
  {
    id: 'art-03',
    slug: 'accra-design-scene',
    title: 'Accra: A New Design Capital',
    excerpt: 'How Ghana\'s capital is emerging as a hub for global design excellence.',
    content: `
      <p>Something remarkable is happening in Accra. A new generation of designers, artists, and makers is redefining what African design can be—not exotic curiosity for foreign markets, but confident creative expression that stands alongside the best the world has to offer.</p>
      
      <p>BOEMMM is proud to be part of this movement. We are based in Accra not despite but because of its creative energy. Here, we have access to craft traditions that have evolved over millennia, combined with a forward-looking spirit that refuses to be constrained by expectations.</p>
      
      <p>The city itself inspires us. The play of light through jacaranda trees. The rhythms of daily life. The juxtaposition of old and new, tradition and innovation.</p>
      
      <p>We believe Accra is not just an emerging design destination—it is a design capital in the making.</p>
    `,
    author: 'BOEMMM Editorial',
    date: '2024-03-10',
    category: 'Culture',
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((a) => a.slug === slug);
};
