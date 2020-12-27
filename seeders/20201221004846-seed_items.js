"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          id: 1,
          collectionId: 1,
          name: "Item for Collection 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          collectionId: 1,
          name: "Another Item for Collection 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          collectionId: 2,
          name: "Item for Collection 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          collectionId: 2,
          name: "Another Item for Collection 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          collectionId: 3,
          name: "Item for Collection 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          collectionId: 3,
          name: "Another Item for Collection 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          collectionId: 4,
          name: "Item for Collection 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          collectionId: 4,
          name: "Another Item for Collection 4",
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
