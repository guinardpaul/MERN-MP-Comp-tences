const Sequelize = require('sequelize');
// Changer config file in environment mode
const config = require('./config/config.dev');

// database connection with sequelize
const sequelize = new Sequelize('notes_competencesdb_sequelizedb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


module.exports = sequelize;