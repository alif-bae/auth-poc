"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group)
      this.belongsToMany(models.User, {through: 'UserRole'})
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      role: DataTypes.STRING,
      groupId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
