const Sequelize = require("sequelize")

const sequelize = new Sequelize('database', 'root', '',
  {
    host: '127.0.0.1',
    dialect: "sqlite",
    storage: "./database.sqlite"
  }
);

module.exports = sequelize;
global.sequelize = sequelize;