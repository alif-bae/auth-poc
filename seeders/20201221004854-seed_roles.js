"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          groupId: null,
          role: "globalManager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          groupId: 1,
          role: "regular",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          groupId: 1,
          role: "manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          groupId: 2,
          role: "regular",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          groupId: 2,
          role: "manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
