const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL conectado');
    return sequelize.sync(); // Sincronizar modelos com banco
  })
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Erro ao conectar PostgreSQL:', err));

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Wellness Way Shop funcionando!' });
});

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
