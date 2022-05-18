const {DataTypes} = require('sequelize');
const connection = require('../configuration/userDetail')

const hotelData = connection.define('hoteldata',{
    
    hotelName:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    categoryId:{
        type: DataTypes.INTEGER,
        notEmpty : true
    },
    categoryType:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    image:{
        type: DataTypes.STRING,
        notEmpty : true
    }

});

module.exports = hotelData