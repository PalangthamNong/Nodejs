const { Sequelize } = require("../Database/db");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "assigntasks",
  {
    AssignTasks_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AssignTasks_Date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    AssignTasks_Time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Period: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_User: {
      type: Sequelize.STRING,
      allowNull: false,
  
    },
    AssignTasks_Details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "assigntasks",
  }
);
