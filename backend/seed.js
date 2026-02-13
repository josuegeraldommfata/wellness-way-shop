const sequelize = require('./database');
<<<<<<< HEAD
const Product = require('./models/Product');
const User = require('./models/User');
=======
const bcrypt = require('bcryptjs');
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1

// Importar todos os modelos
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Banner = require('./models/Banner');
const Coupon = require('./models/Coupon');
const VideoTestimonial = require('./models/VideoTestimonial');
const SiteSettings = require('./models/SiteSettings');
const PaymentMethod = require('./models/PaymentMethod');

// ============ DADOS DE SEED ============

const users = [
  {
    name: 'Administrador',
    email: 'admin@lipoimports.com',
    password: 'admin123',
    role: 'admin',
    phone: '(83) 99339-6445',
  },
  {
    name: 'Cliente Teste',
    email: 'cliente@email.com',
    password: 'cliente123',
    role: 'customer',
    phone: '(11) 99999-9999',
    address: JSON.stringify({
      street: 'Rua Exemplo, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      cep: '01001-000',
    }),
  },
];

const categoriesData = [
  { name: 'Canetas Emagrecedoras', slug: 'canetas-emagrecedoras', description: 'Canetas de aplicação para emagrecimento', image: '' },
  { name: 'Vitaminas', slug: 'vitaminas', description: 'Suplementos vitamínicos importados', image: '' },
  { name: 'Suplementos', slug: 'suplementos', description: 'Suplementos para saúde e bem-estar', image: '' },
];

const productsData = [
  {
    name: 'MOUNJARO 15mg (Lilly)', slug: 'mounjaro-15mg-lilly',
    description: 'Mounjaro (tirzepatida) é um medicamento injetável uma vez por semana, aprovado para o tratamento de diabetes tipo 2 e controle de peso. Produto original importado da Eli Lilly.',
    shortDescription: 'Tirzepatida 15mg - Aplicação semanal', price: 3300.00, installments: 12, installmentPrice: 275.00,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Eli Lilly',
    inStock: true, isFeatured: true, isBestSeller: true, tags: ['tirzepatida', 'emagrecimento', 'diabetes'],
  },
  {
    name: 'TG - 15mg (Indufar)', slug: 'tg-15mg-indufar',
    description: 'Tirzepatida 15mg da Indufar. Fórmula avançada para controle glicêmico e perda de peso.',
    shortDescription: 'Tirzepatida 15mg - Nova Apresentação', price: 1800.00, installments: 12, installmentPrice: 150.00,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Indufar',
    inStock: true, isFeatured: true, isBestSeller: false, tags: ['tirzepatida', 'emagrecimento'],
  },
  {
    name: 'RETATRUTIDE 40mg (Synedica)', slug: 'retatrutide-40mg-synedica',
    description: 'Retatrutide é um agonista triplo de receptores GIP, GLP-1 e glucagon. Produto de última geração para controle de peso.',
    shortDescription: 'Triplo agonista 40mg', price: 2500.00, installments: 12, installmentPrice: 208.33,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Synedica',
    inStock: true, isFeatured: true, isBestSeller: false, tags: ['retatrutide', 'emagrecimento'],
  },
  {
    name: 'MOUNJARO 10mg (Lilly)', slug: 'mounjaro-10mg-lilly',
    description: 'Mounjaro (tirzepatida) 10mg é indicado para tratamento de diabetes tipo 2 e auxílio na perda de peso.',
    shortDescription: 'Tirzepatida 10mg - Aplicação semanal', price: 2800.00, installments: 12, installmentPrice: 233.33,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Eli Lilly',
    inStock: true, isFeatured: true, isBestSeller: true, tags: ['tirzepatida', 'emagrecimento', 'diabetes'],
  },
  {
    name: 'TG - 12,5mg (Indufar)', slug: 'tg-12-5mg-indufar',
    description: 'Tirzepatida 12,5mg da Indufar. Dosagem intermediária ideal para progressão gradual do tratamento.',
    shortDescription: 'Tirzepatida 12,5mg', price: 1600.00, installments: 12, installmentPrice: 133.33,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Indufar',
    inStock: true, isFeatured: false, isBestSeller: true, tags: ['tirzepatida', 'emagrecimento'],
  },
  {
    name: 'TG - 10mg (Indufar)', slug: 'tg-10mg-indufar',
    description: 'Tirzepatida 10mg da Indufar. Excelente opção para início de tratamento.',
    shortDescription: 'Tirzepatida 10mg/0,5mL', price: 1400.00, installments: 12, installmentPrice: 116.67,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Indufar',
    inStock: true, isFeatured: false, isBestSeller: false, tags: ['tirzepatida', 'emagrecimento'],
  },
  {
    name: 'TG - 7,5mg (Indufar)', slug: 'tg-7-5mg-indufar',
    description: 'Tirzepatida 7,5mg da Indufar. Dosagem para fase inicial do tratamento.',
    shortDescription: 'Tirzepatida 7,5mg/0,5mL', price: 1200.00, installments: 12, installmentPrice: 100.00,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Indufar',
    inStock: true, isFeatured: false, isBestSeller: false, tags: ['tirzepatida', 'emagrecimento'],
  },
  {
    name: 'TG - 5mg (Indufar)', slug: 'tg-5mg-indufar',
    description: 'Tirzepatida 5mg da Indufar. Dosagem inicial recomendada para novos pacientes.',
    shortDescription: 'Tirzepatida 5mg/0,5mL', price: 800.00, installments: 12, installmentPrice: 66.67,
    images: ['/placeholder.svg'], category: 'canetas-emagrecedoras', brand: 'Indufar',
    inStock: true, isFeatured: false, isBestSeller: false, tags: ['tirzepatida', 'emagrecimento'],
  },
];

const bannersData = [
  {
    title: 'EMAGREÇA COM QUALIDADE E SEGURANÇA',
    subtitle: 'Produtos importados, originais e com entrega rápida para transformar sua rotina.',
    buttonText: 'COMPRAR AGORA',
    buttonLink: '/loja',
    image: '',
    isActive: true,
    order: 1,
  },
];

const couponsData = [
  {
    code: 'BEMVINDO10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 500,
    maxUses: 100,
    usedCount: 12,
    isActive: true,
    expiresAt: '2026-12-31',
  },
  {
    code: 'FRETE50',
    discountType: 'fixed',
    discountValue: 50,
    minPurchase: 1000,
    maxUses: 50,
    usedCount: 5,
    isActive: true,
    expiresAt: '2026-06-30',
  },
];

const videosData = [
  { title: 'Unboxing do pedido', thumbnailUrl: '', videoUrl: 'https://example.com/video1.mp4', duration: '0:22', author: '@cliente_satisfeita', isActive: true },
  { title: 'Minha experiência com Mounjaro', thumbnailUrl: '', videoUrl: 'https://example.com/video2.mp4', duration: '0:49', author: '@maria_saude', isActive: true },
  { title: 'Chegou meu pedido!', thumbnailUrl: '', videoUrl: 'https://example.com/video3.mp4', duration: '1:27', author: '@fit_journey', isActive: true },
];

const ordersData = [
  {
    items: [{ productId: 1, productName: 'MOUNJARO 15mg (Lilly)', quantity: 1, price: 3300 }],
    subtotal: 3300, discount: 0, total: 3300, status: 'delivered', paymentMethod: 'mercadopago',
    paymentId: 'MP-001', userInfo: { name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 99999-9999', address: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', cep: '01310-100' },
  },
  {
    items: [{ productId: 2, productName: 'TG - 15mg (Indufar)', quantity: 2, price: 1800 }],
    subtotal: 3600, discount: 0, total: 3600, status: 'processing', paymentMethod: 'stripe',
    userInfo: { name: 'João Santos', email: 'joao@email.com', phone: '(21) 98888-8888', address: 'Rua Copacabana, 500', city: 'Rio de Janeiro', state: 'RJ', cep: '22041-080' },
  },
  {
    items: [{ productId: 3, productName: 'RETATRUTIDE 40mg (Synedica)', quantity: 1, price: 2500 }],
    subtotal: 2500, discount: 250, total: 2250, status: 'pending', paymentMethod: 'mercadopago',
    userInfo: { name: 'Ana Oliveira', email: 'ana@email.com', phone: '(83) 97777-7777', address: 'Rua das Flores, 200', city: 'João Pessoa', state: 'PB', cep: '58000-000' },
    coupon: { code: 'BEMVINDO10', discount: 250 },
  },
];

const settingsData = {
  siteName: 'LipoImports',
  logoUrl: '',
  primaryColor: '217 91% 55%',
  secondaryColor: '203 67% 94%',
  accentColor: '145 63% 42%',
  topBarText: 'Importados para seu bem-estar!',
  footerAboutText: 'A LipoImports oferece produtos importados de qualidade para auxiliar no emagrecimento, com preço justo e entrega rápida em todo o Brasil.',
  footerPhone: '(83) 99339-6445',
  footerEmail: 'contato@lipoimports.com.br',
  footerInstagram: 'https://instagram.com/lipoimports',
  footerFacebook: '',
  footerYoutube: '',
};

const paymentMethodsData = [
  { name: 'Mercado Pago', type: 'mercadopago', enabled: false, config: { publicKey: '', accessToken: '' } },
  { name: 'PIX', type: 'pix', enabled: true, config: { pixKey: '', pixName: 'LipoImports' } },
  { name: 'Stripe', type: 'stripe', enabled: false, config: { publishableKey: '', secretKey: '' } },
  { name: 'PayPal', type: 'paypal', enabled: false, config: { clientId: '', clientSecret: '', sandboxMode: 'true' } },
  { name: 'PagSeguro', type: 'pagseguro', enabled: false, config: { email: '', token: '', sandboxMode: 'true' } },
];

// ============ EXECUTAR SEED ============

const seedDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado');

<<<<<<< HEAD
    // Limpar dados existentes
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });
    console.log('Dados existentes removidos');

    // Inserir usuários de teste
    await User.create({
      email: 'admin@teste.com',
      password: '123456',
      role: 'admin',
      name: 'Administrador'
    });

    await User.create({
      email: 'cliente@teste.com',
      password: '123456',
      role: 'client',
      name: 'Cliente Teste'
    });

    console.log('Usuários de teste inseridos');
=======
    // Force sync (recria todas as tabelas)
    await sequelize.sync({ force: true });
    console.log('Tabelas recriadas');
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1

    // 1. Usuários
    for (const userData of users) {
      await User.create(userData);
    }
    console.log('✅ Usuários criados (admin + cliente)');

    // 2. Categorias
    await Category.bulkCreate(categoriesData);
    console.log('✅ Categorias criadas');

    // 3. Produtos
    await Product.bulkCreate(productsData);
    console.log('✅ Produtos criados');

    // 4. Banners
    await Banner.bulkCreate(bannersData);
    console.log('✅ Banners criados');

    // 5. Cupons
    await Coupon.bulkCreate(couponsData);
    console.log('✅ Cupons criados');

    // 6. Vídeos
    await VideoTestimonial.bulkCreate(videosData);
    console.log('✅ Vídeos criados');

    // 7. Pedidos
    await Order.bulkCreate(ordersData);
    console.log('✅ Pedidos criados');

    // 8. Configurações do site
    for (const [key, value] of Object.entries(settingsData)) {
      await SiteSettings.create({ key, value: String(value) });
    }
    console.log('✅ Configurações do site criadas');

    // 9. Métodos de pagamento
    await PaymentMethod.bulkCreate(paymentMethodsData);
    console.log('✅ Métodos de pagamento criados');

    console.log('\n🎉 Seed completo! Todas as tabelas populadas.');
    console.log('📧 Admin: admin@lipoimports.com / admin123');
    console.log('📧 Cliente: cliente@email.com / cliente123');

    process.exit();
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
};

seedDB();
