const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  pool: {
    max: 400
  }
});

module.exports = sequelize;
module.exports.DataTypes = DataTypes;
