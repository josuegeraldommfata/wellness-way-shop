const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
  },
  buttonText: {
    type: DataTypes.STRING,
  },
  buttonLink: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT, // base64 or URL
    defaultValue: '',
  },
  mobileImage: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = Banner;
