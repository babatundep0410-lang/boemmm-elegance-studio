import articleFounders from '@/assets/article-founders.png';
import articleGivingBack from '@/assets/article-giving-back.webp';
import articleSustainability from '@/assets/article-sustainability.jpeg';

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
    id: 'art-founders',
    slug: 'letter-from-founders',
    title: 'From Founders to Patrons',
    excerpt: 'A personal letter introducing our vision where innovation, artistry and philanthropy come together in perfect harmony.',
    content: `
      <p>Dear Esteemed Friends and Future Patrons,</p>
      
      <p>We are delighted to introduce you to our brand, where innovation, artistry and philanthropy come together in perfect harmony.</p>
      
      <h2>The Essence of BÖEMMM</h2>
      
      <p>At BÖEMMM, we believe that furniture is more than just functional pieces; it is an expression of lifestyle, a reflection of your personality, and an essential element of your home. Our vision is to create timeless pieces that blend seamlessly into your spaces, enhancing their beauty and functionality.</p>
      
      <h2>Unveiling the Collections</h2>
      
      <p>Each year, we will meticulously craft a new collection that encapsulates the spirit of the times while maintaining the enduring quality that defines BÖEMMM. These collections are the result of tireless dedication to design, innovation, and the pursuit of perfection. From modern minimalism to classic opulence, our collections will cater to diverse tastes and preferences, ensuring that you find pieces that resonate with your unique style.</p>
      
      <h2>Exquisite Additions Throughout the Year</h2>
      
      <p>While our annual collections serve as the cornerstone of BÖEMMM, we are also excited to introduce exquisite additions throughout the year. These are pieces that we believe will elevate your spaces and make a statement wherever placed. Keep an eye out for these special releases that will help you curate your space with the finest craftsmanship and attention to detail.</p>
      
      <h2>Luxury with a Purpose</h2>
      
      <p>At BÖEMMM, we understand the importance of giving back. As a brand deeply committed to making a positive impact, we have pledged to donate 2% of our net income to charitable causes. By choosing BÖEMMM, you are not only investing in luxurious furniture but also contributing to meaningful philanthropic endeavors that address pressing national and global issues.</p>
      
      <h2>Join the BÖEMMM Experience</h2>
      
      <p>We invite you to explore our collections, immerse yourself in the world of BÖEMMM, and discover pieces that resonate with your unique style. Whether you are seeking to transform your spaces or searching for that one-of-a-kind statement piece, BÖEMMM promises to exceed your expectations. And, we promise that our pieces will grow into your home, becoming organically more beautiful over time.</p>
      
      <p>Thank you for considering us as your source for furniture. We are excited to embark on this journey with you, where elegance meets purpose, and luxury becomes an instrument for positive change.</p>
      
      <p>Warm regards,<br/>Founders,<br/>BÖEMMM</p>
    `,
    author: 'BOEMMM Founders',
    date: '2024-04-01',
    image: articleFounders,
    category: 'Letter',
  },
  {
    id: 'art-giving-back',
    slug: 'commitment-to-giving-back',
    title: 'A Commitment to Giving Back',
    excerpt: 'True fine living extends to making a positive impact on the world around us. Discover our pledge to donate 2% of our net income to charitable causes.',
    content: `
      <p>At BÖEMMM, we believe that true fine living transcends aesthetics and comfort—it extends to making a positive impact on the world around us. That's why we are thrilled to announce our commitment to donating 2% of our net income to charitable causes.</p>
      
      <p>As founders, we recognize the importance of not only creating exquisite pieces for your home but also of giving back to society at large. Our decision to allocate a portion of our earnings to charities reflects our core values and our vision for a more compassionate and sustainable future.</p>
      
      <h2>Why 2%?</h2>
      
      <p>We understand that you, our valued customers, invest in our brand not just for the beauty and quality of our furniture, but also for the values we stand for. While 2% may seem modest, it's a meaningful step towards making a difference to the society we live in.</p>
      
      <p>By earmarking 2% of our net income for charitable contributions, we aim to strike a balance between growing our brand and giving back to the communities that need it most. We firmly believe that even small actions can have a profound impact when they are fueled by purpose and commitment.</p>
      
      <h2>Our Evolving Impact</h2>
      
      <p>As our brand continues to thrive and our sales grow, so too will our contributions to charitable organizations. We see this as an ongoing commitment, one that will expand in tandem with our success. In the spirit of transparency, we will regularly update you on the charities we choose to support and the difference your purchases are making.</p>
      
      <p>Our focus will not only be on national and international causes but also on local initiatives that resonate with our values. Whether it's supporting education, healthcare, or community development, we are committed to making a lasting difference.</p>
      
      <h2>Join Us in Making a Difference</h2>
      
      <p>We invite you to join us on this incredible journey. Every purchase you make from BÖEMMM contributes to our charitable initiatives. By choosing our furniture, you are not only enhancing your living space, you are also becoming part of a community that believes in the power of giving back.</p>
      
      <p>Thank you for your trust in BÖEMMM, and for helping us turn our vision of a more compassionate world into a reality, one exquisite piece of furniture at a time.</p>
      
      <p>Warm regards,<br/>Founders,<br/>BÖEMMM</p>
    `,
    author: 'BOEMMM Founders',
    date: '2024-03-20',
    image: articleGivingBack,
    category: 'Community',
  },
  {
    id: 'art-sustainability',
    slug: 'embracing-sustainability',
    title: 'Embracing Sustainability',
    excerpt: 'Our commitment to sustainability goes beyond crafting beautiful furniture. We believe in making choices that benefit our planet and communities.',
    content: `
      <p>At BÖEMMM, our commitment to sustainability goes beyond crafting beautiful furniture. We believe in making choices that benefit our planet, our communities, and the rich cultural heritage of Africa. Here's how:</p>
      
      <h2>Sustainable Procurement</h2>
      
      <p>We are dedicated to the responsible sourcing of materials. Our journey begins with the careful selection of eco-friendly materials by working with suppliers who share our values and are committed to sourcing ethically and sustainably. This not only reduces our environmental footprint but also supports the preservation of precious materials.</p>
      
      <h2>Collaboration with Local Artisans</h2>
      
      <p>Our passion for sustainability extends to our partnerships with local artisans. We empower talented craftsmen and craftswomen from our local community, fostering economic growth and preserving traditional skills. By working closely with these artisans, we celebrate their expertise and bring their unique craftsmanship to the global stage. Each piece of furniture tells a story, a testament to the hands that created it.</p>
      
      <h2>Discover Authenticity</h2>
      
      <p>We invite you to explore our exquisite collections, each piece a reflection of our dedication to preserving the planet, supporting local communities, and celebrating African creativity.</p>
      
      <p>Join us in making a difference, one piece of furniture at a time.</p>
    `,
    author: 'BOEMMM Editorial',
    date: '2024-03-15',
    image: articleSustainability,
    category: 'Sustainability',
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((a) => a.slug === slug);
};
