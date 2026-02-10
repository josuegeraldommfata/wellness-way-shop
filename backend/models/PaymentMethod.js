const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  config: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
}, {
  timestamps: true,
});

module.exports = PaymentMethod;
