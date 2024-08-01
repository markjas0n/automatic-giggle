const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employee_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
