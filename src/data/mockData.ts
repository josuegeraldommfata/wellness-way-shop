// Mock data for the health e-commerce store
// Ready for future API integration

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  installments: number;
  installmentPrice: number;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  handle: string;
  content: string;
  rating: number;
  date: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  author: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  image: string;
  mobileImage?: string;
  isActive: boolean;
  order: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Canetas Emagrecedoras",
    slug: "canetas-emagrecedoras",
    description: "Canetas de aplicação para emagrecimento",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Vitaminas",
    slug: "vitaminas",
    description: "Suplementos vitamínicos importados",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Suplementos",
    slug: "suplementos",
    description: "Suplementos para saúde e bem-estar",
    image: "/placeholder.svg",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "MOUNJARO 15mg (Lilly)",
    slug: "mounjaro-15mg-lilly",
    description: "Mounjaro (tirzepatida) é um medicamento injetável uma vez por semana, aprovado para o tratamento de diabetes tipo 2 e controle de peso. Produto original importado da Eli Lilly.",
    shortDescription: "Tirzepatida 15mg - Aplicação semanal",
    price: 3300.00,
    installments: 12,
    installmentPrice: 275.00,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Eli Lilly",
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["tirzepatida", "emagrecimento", "diabetes"],
  },
  {
    id: "2",
    name: "TG - 15mg (Indufar)",
    slug: "tg-15mg-indufar",
    description: "Tirzepatida 15mg da Indufar. Fórmula avançada para controle glicêmico e perda de peso. Produto importado com qualidade garantida.",
    shortDescription: "Tirzepatida 15mg - Nova Apresentação",
    price: 1800.00,
    installments: 12,
    installmentPrice: 150.00,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Indufar",
    inStock: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ["tirzepatida", "emagrecimento"],
  },
  {
    id: "3",
    name: "RETATRUTIDE 40mg (Synedica)",
    slug: "retatrutide-40mg-synedica",
    description: "Retatrutide é um agonista triplo de receptores GIP, GLP-1 e glucagon. Produto de última geração para controle de peso.",
    shortDescription: "Triplo agonista 40mg",
    price: 2500.00,
    installments: 12,
    installmentPrice: 208.33,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Synedica",
    inStock: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ["retatrutide", "emagrecimento"],
  },
  {
    id: "4",
    name: "MOUNJARO 10mg (Lilly)",
    slug: "mounjaro-10mg-lilly",
    description: "Mounjaro (tirzepatida) 10mg é indicado para tratamento de diabetes tipo 2 e auxílio na perda de peso. Produto original Eli Lilly.",
    shortDescription: "Tirzepatida 10mg - Aplicação semanal",
    price: 2800.00,
    installments: 12,
    installmentPrice: 233.33,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Eli Lilly",
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["tirzepatida", "emagrecimento", "diabetes"],
  },
  {
    id: "5",
    name: "TG - 12,5mg (Indufar)",
    slug: "tg-12-5mg-indufar",
    description: "Tirzepatida 12,5mg da Indufar. Dosagem intermediária ideal para progressão gradual do tratamento.",
    shortDescription: "Tirzepatida 12,5mg",
    price: 1600.00,
    installments: 12,
    installmentPrice: 133.33,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Indufar",
    inStock: true,
    isFeatured: false,
    isBestSeller: true,
    tags: ["tirzepatida", "emagrecimento"],
  },
  {
    id: "6",
    name: "TG - 10mg (Indufar)",
    slug: "tg-10mg-indufar",
    description: "Tirzepatida 10mg da Indufar. Excelente opção para início de tratamento com boa tolerância.",
    shortDescription: "Tirzepatida 10mg/0,5mL",
    price: 1400.00,
    installments: 12,
    installmentPrice: 116.67,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Indufar",
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    tags: ["tirzepatida", "emagrecimento"],
  },
  {
    id: "7",
    name: "TG - 7,5mg (Indufar)",
    slug: "tg-7-5mg-indufar",
    description: "Tirzepatida 7,5mg da Indufar. Dosagem para fase inicial do tratamento.",
    shortDescription: "Tirzepatida 7,5mg/0,5mL",
    price: 1200.00,
    installments: 12,
    installmentPrice: 100.00,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Indufar",
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    tags: ["tirzepatida", "emagrecimento"],
  },
  {
    id: "8",
    name: "TG - 5mg (Indufar)",
    slug: "tg-5mg-indufar",
    description: "Tirzepatida 5mg da Indufar. Dosagem inicial recomendada para novos pacientes.",
    shortDescription: "Tirzepatida 5mg/0,5mL",
    price: 800.00,
    installments: 12,
    installmentPrice: 66.67,
    images: ["/placeholder.svg"],
    category: "canetas-emagrecedoras",
    brand: "Indufar",
    inStock: true,
    isFeatured: false,
    isBestSeller: false,
    tags: ["tirzepatida", "emagrecimento"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Marcia",
    handle: "@marciafit_33",
    content: "Chegou tudo certinho, bem embalado e rápido. Já comecei a usar hoje, obrigada! 🙏",
    rating: 5,
    date: "2025-01-15",
  },
  {
    id: "2",
    author: "João Vitor",
    handle: "@joaovitor_sp",
    content: "Entrega super rápida, o produto chegou lacrado e ainda bem geladinho. Atendimento top 👌",
    rating: 5,
    date: "2025-01-18",
  },
  {
    id: "3",
    author: "Aline",
    handle: "@aline_rj",
    content: "Veio tudo direitinho, dentro do prazo e com rastreio atualizado. Super confiável!",
    rating: 5,
    date: "2025-01-20",
  },
  {
    id: "4",
    author: "Ricardo",
    handle: "@ricardo_fitness",
    content: "Melhor loja de importados que já comprei. Produto original e entrega impecável!",
    rating: 5,
    date: "2025-01-22",
  },
];

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    title: "Unboxing do pedido",
    thumbnailUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video1.mp4",
    duration: "0:22",
    author: "@cliente_satisfeita",
  },
  {
    id: "2",
    title: "Minha experiência com Mounjaro",
    thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video2.mp4",
    duration: "0:49",
    author: "@maria_saude",
  },
  {
    id: "3",
    title: "Chegou meu pedido!",
    thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video3.mp4",
    duration: "1:27",
    author: "@fit_journey",
  },
  {
    id: "4",
    title: "Review do produto",
    thumbnailUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video4.mp4",
    duration: "0:27",
    author: "@carla_bem_estar",
  },
  {
    id: "5",
    title: "1 mês usando - Resultados",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video5.mp4",
    duration: "0:48",
    author: "@transformacao_real",
  },
  {
    id: "6",
    title: "Como aplicar corretamente",
    thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
    videoUrl: "https://example.com/video6.mp4",
    duration: "1:40",
    author: "@dicas_saude",
  },
];

// Cart helper functions (for future API integration)
export interface CartItem {
  product: Product;
  quantity: number;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const calculateInstallment = (price: number, installments: number): string => {
  const value = price / installments;
  return formatPrice(value);
};
