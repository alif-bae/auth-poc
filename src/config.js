const config = {
  "development": {
    "port": 3000,
    "database": {
      "username": "root",
      "password": null,
      "database": "database_development",
      "host": "127.0.0.1",
      "dialect": "sqlite",
      "storeage": "./database.sqlite3"
    }
  }
};

module.exports = config