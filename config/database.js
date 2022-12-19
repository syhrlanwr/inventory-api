const Sequelize = require('sequelize');

const db = new Sequelize('inventory-api', 'root', "1", {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
});

module.exports = db;