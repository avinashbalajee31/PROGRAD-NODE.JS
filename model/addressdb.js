const {DataTypes} = require('sequelize');
const connect = require('../configuration/userDetail')

const addressDetail = connect.define('addressdetail',{
    
    door_number:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    street_name:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    area:{
        type: DataTypes.STRING,
        notEmpty : true
    },

    city:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    pincode:{
        type: DataTypes.INTEGER,
        notEmpty : true
    },
    phone_num:{
        type: DataTypes.BIGINT,
        notEmpty : true
    }

});

module.exports = addressDetail