const {Sequelize} = require('sequelize');
const db = require('../config/database');
const {DataTypes} = Sequelize;


const Jenis = db.define('jenis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Jenis;