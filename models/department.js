const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
});

module.exports = Department;
