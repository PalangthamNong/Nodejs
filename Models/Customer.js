const Sequelize = require("sequelize");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "customer",
  {
    Customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    FullName_c: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Check_Pass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "customer",
  }
);
