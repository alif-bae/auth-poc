"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          id: 1,
          name: "Executives",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Testers",
          createdAt: new Date(),
          updatedAt: new Date()

        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
