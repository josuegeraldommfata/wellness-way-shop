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

// Importar modelos para sincronização
const Product = require('./models/Product');
const Order = require('./models/Order');
const Log = require('./models/Log');
const Settings = require('./models/Settings');

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
const shippingRoutes = require('./routes/shipping');

const app = express();

// In-memory storage for logs and alerts (in production, use database)
let logs = [];
let alerts = [];
let aiAnalysis = {
  anomalyLevel: 'Normal',
  confidenceScores: { normal: 1.0, suspicious: 0.0, critical: 0.0 }
};

// Default settings
let settings = {
  anomalyThresholdLow: 1,
  anomalyThresholdMedium: 3,
  anomalyThresholdHigh: 5,
  aiEnabled: true
};

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
app.use('/api/shipping', shippingRoutes);

// Rota para logs de atividade
app.post('/api/logs', (req, res) => {
  const { user, action, ip } = req.body;
  const timestamp = new Date();

  // Salvar log
  logs.push({ user, action, ip, timestamp });

  // Detecção de anomalias para tentativas de login (per user, across IPs)
  if (action === 'login') {
    const sixtySecondsAgo = new Date(timestamp.getTime() - 60 * 1000);
    const recentLoginLogs = logs.filter(log =>
      log.user === user &&
      log.action === 'login' &&
      new Date(log.timestamp) >= sixtySecondsAgo
    );

    const count = recentLoginLogs.length;
    let level = 'LOW';
    let explanation = '';

    if (count >= settings.anomalyThresholdHigh) {
      level = 'HIGH';
      explanation = `Anomaly detected: ${count} login attempts in 1 minute`;
    } else if (count >= settings.anomalyThresholdMedium) {
      level = 'MEDIUM';
      explanation = `Anomaly detected: ${count} login attempts in 1 minute`;
    } else if (count >= settings.anomalyThresholdLow) {
      level = 'LOW';
      explanation = `Anomaly detected: ${count} login attempts in 1 minute`;
    }

    // Save anomaly if any level (including LOW for tracking)
    alerts.push({
      user,
      ip,
      timestamp,
      activity: 'login_attempt',
      level,
      score: count,
      explanation
    });
  }

  // Análise AI (placeholder)
  if (settings.aiEnabled) {
    analyzeBehavior(user);
  }

  res.json({ message: 'Log recorded' });
});

// Rota para obter logs (para admin)
app.get('/api/logs', (req, res) => {
  res.json(logs);
});

// Rota para obter alertas
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// Rota para análise AI
app.get('/api/ai-analysis', (req, res) => {
  res.json(aiAnalysis);
});

// Função de análise AI (placeholder)
function analyzeBehavior(user) {
  // Analyze logs and alerts for patterns
  const userLogs = logs.filter(log => log.user === user && log.action === 'login');
  const userAlerts = alerts.filter(alert => alert.user === user);

  // Detect patterns: unique IPs, attempts in last hour
  const uniqueIPs = new Set(userLogs.map(log => log.ip).filter(ip => ip)).size;
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const attemptsInLastHour = userLogs.filter(log => new Date(log.timestamp) >= oneHourAgo).length;
  const highAlerts = userAlerts.filter(alert => alert.level === 'HIGH').length;

  // Simple rule-based AI classification
  if (uniqueIPs > 5 || attemptsInLastHour > 20 || highAlerts > 5) {
    aiAnalysis.anomalyLevel = 'Critical';
    aiAnalysis.confidenceScores = { normal: 0.0, suspicious: 0.1, critical: 0.9 };
  } else if (uniqueIPs > 3 || attemptsInLastHour > 10 || highAlerts > 2) {
    aiAnalysis.anomalyLevel = 'Suspicious';
    aiAnalysis.confidenceScores = { normal: 0.2, suspicious: 0.6, critical: 0.2 };
  } else {
    aiAnalysis.anomalyLevel = 'Normal';
    aiAnalysis.confidenceScores = { normal: 0.9, suspicious: 0.05, critical: 0.05 };
  }

  // Future: Integrate with ChatGPT/GNN API
  // async function analyzeWithAI(userLogs, userAlerts) {
  //   const prompt = `Analyze user behavior for anomalies. Logs: ${JSON.stringify(userLogs.slice(-50))}. Alerts: ${JSON.stringify(userAlerts.slice(-10))}. Classify as Normal, Suspicious, or Critical.`;
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
  //     body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }] })
  //   });
  //   const data = await response.json();
  //   return data.choices[0].message.content.trim();
  // }
  // const aiResult = await analyzeWithAI(userLogs, userAlerts);
  // aiAnalysis.anomalyLevel = aiResult.includes('Critical') ? 'Critical' : aiResult.includes('Suspicious') ? 'Suspicious' : 'Normal';
}

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API LipoImports E-commerce funcionando!', version: '1.0.0' });
});

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
