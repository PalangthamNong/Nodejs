const { Sequelize } = require("../Database/db");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "assessment",
  {
    Question_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    Q1: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Q2: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Q3: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Q4: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Q5: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Q6: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Period: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Customer_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    ID_User: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "assessment",
  }
);
