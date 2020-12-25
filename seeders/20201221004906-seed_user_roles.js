'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "UserRoles",
      [
        {
          id: 1,
          userId: 1,
          roleId: 1,  // global manager
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          userId: 2,  // manager_g1
          roleId: 3,  // manager group 1
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          userId: 3,  // regular_g1
          roleId: 2,  // regular group 1
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          userId: 4,  // regular_g1+2
          roleId: 2,  // regular group 1
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          userId: 4,  // regular_g1+2
          roleId: 5,  // regular group 2
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          userId: 5,  // manager_g1+2
          roleId: 3,  // manager group 1
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          userId: 5,  // manager_g1+2
          roleId: 5,  // manager group 2
          createdAt: new Date(),
          updatedAt: new Date()
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
  }
};
