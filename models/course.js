'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        foreignKey: 'TeacherId',
        as : 'teacher'
      });
      Course.belongsToMany(models.User, {
        through: models.Class,
        foreignKey: 'CourseId',
        as : 'students'
      });
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    category: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};