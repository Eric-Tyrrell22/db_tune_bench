const sequelize     = require("../db");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.TEXT
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: "User" // We need to choose the model name
});

module.exports = User;
