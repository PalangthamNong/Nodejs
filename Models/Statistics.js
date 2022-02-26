const { Sequelize } = require("../Database/db");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "statistics",
  {
    Statistics_Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Sts_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    Sts_ID_User: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Typequeue: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "statistics",
  }
);
