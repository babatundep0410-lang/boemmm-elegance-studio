import slideDining from '@/assets/slide-dining.png';
import slideOcean from '@/assets/slide-ocean.png';
import slideLounge from '@/assets/slide-lounge.png';
import slideMirror from '@/assets/slide-mirror.png';

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  collectionSlug: string;
  category: string;
  categorySlug: string;
  price: number;
  description: string;
  longDescription: string;
  specifications: {
    material: string;
    color: string;
    dimensions: string;
    weight?: string;
    finish?: string;
  };
  images: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'wl-dining-table-01',
    slug: 'dining-table',
    name: 'Dining Table',
    collection: "Wrought L'émeute",
    collectionSlug: 'wrought-lemute',
    category: 'Dining Tables',
    categorySlug: 'dining-table',
    price: 2599,
    description: 'An oval table, reminiscent of the grandeur seen in Gothic architecture, is gracefully elevated by a meticulously designed support system. Eight sleek metal legs converge into four, forming a sturdy and visually captivating base.',
    longDescription: 'From the opulent Art Deco style, where its intricate metalwork can evoke a sense of luxury, to the sleek lines and minimalist aesthetics of Contemporary design, this table effortlessly transcends various decorative preferences.',
    specifications: {
      material: 'Metal, Glass',
      color: 'Black',
      dimensions: '243.84 cm (L) × 106.9 cm (W) × 76.2 cm (H)',
      weight: '85 kg',
      finish: 'Powder-coated matte',
    },
    images: [slideDining],
    featured: true,
  },
  {
    id: 'wl-centre-table-01',
    slug: 'centre-table',
    name: 'Centre Table',
    collection: "Wrought L'émeute",
    collectionSlug: 'wrought-lemute',
    category: 'Centre Tables',
    categorySlug: 'centre-table',
    price: 1899,
    description: 'A sculptural centrepiece that anchors any living space with its commanding presence. The geometric base creates visual intrigue from every angle.',
    longDescription: 'Crafted with precision metalwork, this centre table serves as both functional furniture and artistic statement. The interplay of light and shadow through its geometric base creates an ever-changing visual experience.',
    specifications: {
      material: 'Metal, Tempered Glass',
      color: 'Black',
      dimensions: '120 cm (L) × 80 cm (W) × 45 cm (H)',
      weight: '45 kg',
      finish: 'Hand-forged, matte black',
    },
    images: [slideOcean],
    featured: true,
  },
  {
    id: 'wl-side-table-01',
    slug: 'side-table',
    name: 'Side Table',
    collection: "Wrought L'émeute",
    collectionSlug: 'wrought-lemute',
    category: 'Side Tables',
    categorySlug: 'side-table',
    price: 899,
    description: 'An elegant companion piece that brings the collection\'s signature aesthetic to intimate spaces. Perfect beside a sofa or as a bedside accent.',
    longDescription: 'The Side Table distills the essence of the collection into a compact form. Its delicate proportions belie its structural integrity, with hand-forged metal creating a piece that is both decorative and enduring.',
    specifications: {
      material: 'Wrought Iron, Glass',
      color: 'Black',
      dimensions: '50 cm (L) × 50 cm (W) × 55 cm (H)',
      weight: '18 kg',
      finish: 'Hand-forged, satin black',
    },
    images: [slideLounge],
    featured: false,
  },
  {
    id: 'wl-mirror-01',
    slug: 'mirror',
    name: 'Mirror',
    collection: "Wrought L'émeute",
    collectionSlug: 'wrought-lemute',
    category: 'Mirrors',
    categorySlug: 'mirror',
    price: 1299,
    description: 'A statement piece that transforms walls into works of art. The intricate ironwork frame draws from West African craft traditions.',
    longDescription: 'This mirror is more than a functional object—it is a meditation on reflection, light, and heritage. The hand-forged frame features patterns inspired by traditional West African ironwork, reimagined for contemporary spaces.',
    specifications: {
      material: 'Wrought Iron, Mirror Glass',
      color: 'Black',
      dimensions: '90 cm (Diameter) × 5 cm (D)',
      weight: '22 kg',
      finish: 'Hand-forged, antiqued black',
    },
    images: [slideMirror],
    featured: true,
  },
];

export const getProductBySlug = (collectionSlug: string, categorySlug: string): Product | undefined => {
  return products.find(
    (p) => p.collectionSlug === collectionSlug && p.categorySlug === categorySlug
  );
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return products.filter((p) => p.collectionSlug === collectionSlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};
