'use strict';
const {dateNormalize} = require('../helper/normalizeDate')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User)
    }

    get age(){
      return new Date().getFullYear() - this.dateOfBirth.getFullYear();
    }

    get birthDate(){
      return dateNormalize(this.dateOfBirth);
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    city: DataTypes.STRING,
    school: DataTypes.STRING,
    degree: DataTypes.STRING,
    university: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};