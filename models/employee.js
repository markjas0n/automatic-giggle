const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Role = require('./role');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id',
    },
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Employee;
