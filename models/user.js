'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

// const { options } = require('../router');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'UserId',
        as: 'details'
        })

      User.hasMany(models.Course, {
        foreignKey: 'TeacherId',
        as: 'lectures'
      })

      User.belongsToMany(models.Course, {
        through: models.Class,
        foreignKey: 'StudentId',
        as:'courses'
      })
    }
  }
  User.init({
    username: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'Username cant be empty'
        },
        notNull: {
          msg : 'Please insert Username'
        }
      }
    },
    password: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'Password cant be empty'
        },
        notNull: {
          msg : 'Please insert password'
        }
      }
    },
    email: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'Email cant be empty'
        },
        notNull: {
          msg : 'Please insert email'
        }
      }
    },
    role: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate:(user,options)=>{
        let salt = bcrypt.genSaltSync(7);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  });
  return User;
};