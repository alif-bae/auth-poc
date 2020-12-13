const Sequelize = require("sequelize")

const sequelize = new Sequelize('database', 'root', '',
  {
    dialect: "sqlite",
    storage: "development.db.sqlite"
  }
);

try {
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
global.sequelize = sequelize;