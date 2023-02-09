'use strict';
const {
  Model
} = require('sequelize');
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
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};