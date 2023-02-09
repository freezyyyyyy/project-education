'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const profiles = JSON.parse(fs.readFileSync('./data/userProfiles.json', 'utf-8')).map(profile => {
      profile.createdAt = profile.updatedAt = new Date()
      return profile
    });
    await queryInterface.bulkInsert('Profiles', profiles)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles')
  }
};
