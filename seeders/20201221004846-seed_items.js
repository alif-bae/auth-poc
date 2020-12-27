"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          id: 1,
          parentId: 1,
          name: "Item for Collection 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          parentId: 1,
          name: "Another Item for Collection 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          parentId: 2,
          name: "Item for Collection 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          parentId: 2,
          name: "Another Item for Collection 2",
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
