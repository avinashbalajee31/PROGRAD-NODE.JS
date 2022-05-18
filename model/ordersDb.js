const {DataTypes} = require('sequelize');
const connection = require('../configuration/userDetail')

const order = connection.define('orders',{

    useraddress:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    userdetails:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    orderdetail:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    totalprice:{
        type: DataTypes.INTEGER,
        notEmpty : true
    },

});

module.exports = order