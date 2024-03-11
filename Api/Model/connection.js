const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../DB_Notebook.db'
});

module.exports = sequelize;
