"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Collections",
      [
        {
          id: 1,
          groupId: 1,
          name: "Collection 1 for Exec Group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          groupId: 1,
          name: "Collection 2 for Exec Group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          groupId: 2,
          name: "Collection 1 for Testers Group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          groupId: 2,
          name: "Collection 2 for Testers Group",
          createdAt: new Date(),
          updatedAt: new Date(),
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
