const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/postgres", {
  logging: false,
  pool: {
    max: 400
  }
});

module.exports = sequelize;
module.exports.DataTypes = DataTypes;
