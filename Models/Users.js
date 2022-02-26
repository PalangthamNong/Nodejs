const Sequelize = require("sequelize");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "users",
  {
    ID_User: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Birthdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Posittions_ID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    StatusPass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notifyStatus: {
      type: Sequelize.INTEGER({ length: 1 }),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "users",
  }
);
