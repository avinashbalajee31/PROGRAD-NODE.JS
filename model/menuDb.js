const {DataTypes} = require('sequelize');
const connection = require('../configuration/userDetail')

const menu = connection.define('menudb',{

    hotelId:{
        type: DataTypes.INTEGER,
        notEmpty : true
    },
    hotelName:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    dishes:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    price:{
        type: DataTypes.INTEGER,
        notEmpty : true
    }

});

module.exports = menu