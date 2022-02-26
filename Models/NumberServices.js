const { Sequelize } = require("../Database/db");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "numberservices",
  {
    Number_Servicesid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Number_Services: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    QDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "numberservices",
  }
);
