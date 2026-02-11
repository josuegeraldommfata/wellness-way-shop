const sequelize = require('./database');

// Importar modelos
const Product = require('./models/Product');
const Order = require('./models/Order');
const Log = require('./models/Log');
const Settings = require('./models/Settings');
const User = require('./models/User');

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado');

    // Sincronizar modelos com banco (criar tabelas)
    await sequelize.sync({ force: false }); // force: false para não dropar tabelas existentes
    console.log('Tabelas sincronizadas com sucesso');

    process.exit();
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
    process.exit(1);
  }
};

syncDB();
