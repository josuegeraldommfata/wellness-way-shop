const sequelize = require('./database');
const Product = require('./models/Product');

// Dados mockados (baseado no frontend)
const products = [
  {
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

const seedDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sincronizar modelos com banco

    // Limpar produtos existentes
    await Product.destroy({ where: {} });
    console.log('Produtos existentes removidos');

    // Inserir novos produtos
    await Product.bulkCreate(products);
    console.log('Produtos inseridos com sucesso');

    process.exit();
  } catch (error) {
    console.error('Erro ao popular banco:', error);
    process.exit(1);
  }
};

seedDB();
