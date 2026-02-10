const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./database');

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Importar modelos (para sincronização)
require('./models/User');
require('./models/Product');
require('./models/Category');
require('./models/Order');
require('./models/Banner');
require('./models/Coupon');
require('./models/VideoTestimonial');
require('./models/SiteSettings');
require('./models/PaymentMethod');

// Importar rotas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const bannerRoutes = require('./routes/banners');
const couponRoutes = require('./routes/coupons');
const videoRoutes = require('./routes/videos');
const settingsRoutes = require('./routes/settings');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentar limite para uploads base64
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Conectar ao PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL conectado');
    return sequelize.sync(); // Sincronizar modelos com banco
  })
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Erro ao conectar PostgreSQL:', err));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/payments', paymentRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API LipoImports E-commerce funcionando!', version: '1.0.0' });
});

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
