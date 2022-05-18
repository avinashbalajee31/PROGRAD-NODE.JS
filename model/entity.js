const {DataTypes} = require('sequelize');
const connection = require('../configuration/userDetail')

const daouser = connection.define('daouser',{
    
    first_name:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    last_name:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    email:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    password:{
        type: DataTypes.STRING,
        notEmpty : true
    }

});

module.exports = daouser