'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')).map(user => {
      delete user.id
      user.createdAt = user.updatedAt = new Date()
      return user
    });
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users')
  }
};
