const { Sequelize } = require("../Database/db");
const DB = require("../Database/db");

module.exports = DB.sequelize.define(
  "queueing",
  {
    Queue_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Queue_Now: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    skiped: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    prority: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "queueing",
  }
);

