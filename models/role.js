const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Department = require('./department');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  salary: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: 'id',
    },
  },
});

module.exports = Role;
