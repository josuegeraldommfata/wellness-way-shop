const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
<<<<<<< HEAD
=======
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
<<<<<<< HEAD
=======
    validate: { isEmail: true },
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
<<<<<<< HEAD
    type: DataTypes.ENUM('admin', 'client'),
    defaultValue: 'client',
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

// Hook para hash da senha antes de salvar
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Método para verificar senha
User.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
=======
    type: DataTypes.ENUM('admin', 'customer'),
    defaultValue: 'customer',
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.JSON, // { street, neighborhood, city, state, cep }
  },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1
};

module.exports = User;
