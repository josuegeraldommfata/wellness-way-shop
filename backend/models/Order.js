const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  items: {
    type: DataTypes.JSONB, // Melhor para PostgreSQL
    allowNull: false,
  },

  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },

  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(
      'pending',
      'paid',
      'shipped',
      'delivered',
      'cancelled'
    ),
    defaultValue: 'pending',
  },

  // 🔥 CORRIGIDO AQUI
  paymentMethod: {
  type: DataTypes.ENUM(
    'stripe',
    'mercadopago',
    'pagseguro',
    'paypal',
    'pix',
    'credit_card',
    'boleto'
  ),
  allowNull: false,
},

  paymentId: {
    type: DataTypes.STRING,
  },

  userInfo: {
    type: DataTypes.JSONB,
    allowNull: false,
  },

  coupon: {
    type: DataTypes.JSONB,
  },

}, {
  timestamps: true,
});

module.exports = Order;
