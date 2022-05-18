const Sequelize = require ('sequelize');

const connection = new Sequelize('bitesdb','root','avib3131@SQL',
{
    dialect: 'mysql',
    host: 'localhost',
    define:{
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = connection;