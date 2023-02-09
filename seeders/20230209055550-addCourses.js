'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courses = JSON.parse(fs.readFileSync('./data/courses.json', 'utf-8')).map(course => {
      course.createdAt = course.updatedAt = new Date()
      return course
    });
    await queryInterface.bulkInsert('Courses', courses)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses')
  }
};
