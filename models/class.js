'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
    }
  }
  Class.init({
    StudentId: {
      type : DataTypes.INTEGER, 
      references : {
        model: 'Users'
    }},
    CourseId: {
      type : DataTypes.INTEGER, 
      references : {
        model: 'Courses'
    }}
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};