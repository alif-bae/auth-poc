"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const psswd = "$2y$12$O4CKzxu35vcepf4Vun/yyusj/ob0uYnyhQq4u9yrcoxmMiNRJao2u" // hello123
    "Users",
      [
        {
          id: 1,
          email: "global_manager@example.com",
          password: psswd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: "manager_g1@example.com",
          password: psswd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          email: "regular_g1@example.com",
          password: psswd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          email: "regular_g1+2@example.com",
          password: psswd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          email: "manager_g1+2@example.com",
          password: psswd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {};
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
