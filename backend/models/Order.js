const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  items: {
    type: DataTypes.JSON, // Array de objetos
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
    type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.ENUM('stripe', 'mercadopago', 'pagseguro', 'paypal'),
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.STRING,
  },
  userInfo: {
    type: DataTypes.JSON, // Objeto com name, email, etc.
    allowNull: false,
  },
  coupon: {
    type: DataTypes.JSON, // Objeto com code, discount
  },
}, {
  timestamps: true,
});

module.exports = Order;
