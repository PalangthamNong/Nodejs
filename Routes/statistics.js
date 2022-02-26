const express = require("express");
const moment = require("moment");
const Statistics = require("../Models/Statistics");
const Users = require("../Models/Users");
const { fn, col, Op } = require("sequelize");
const statistics = express.Router();

statistics.post("/StatisticsInput", async (req, res) => {
  try {
    console.log();
    let ass = await Statistics.create(req.body);
    return res.json(ass);
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

statistics.get("/ShowStatistics", async (req, res) => {
  try {
    Statistics.belongsTo(Users, { foreignKey: "Sts_ID_User" });
    console.log(req.query);
    const userAllCount = await Users.findOne({
      where: {
        StatusPass: `1`,
      },
      attributes: [[fn("count", col("ID_User")), "total"]],
      // attributes: ['ID_User','FirstName'],
    });
    const stat = await Statistics.findAll({
      where: {
        Sts_date: req.query.id,
      },
      // attributes: ["Sts_ID_User"],
      group: ["Sts_ID_User"],
      include: [
        {
          model: Users,
          required: true,
        },
      ],
    });
    const { total } = userAllCount.toJSON();
    const active = stat.length;
    const inactive = total - active;
    return res.json({ total, active, inactive, users: stat });
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

statistics.get("/StatisticsInactive", async (req, res) => {
  try {
    const userin = await Users.findAll({
      where: {
        StatusPass:1,
        ID_User: {
          [Op.notIn]:req.query.id || [],
        },
      },
      order:['ID_User']
    });
    return res.json({ userin});
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

statistics.get("/StatisticsAllone/:id/:date", async (req, res) => {
  try {
    
    return res.json(
      await Statistics.findAll({
        where: {
          Sts_ID_User: req.params.id ,
          Sts_date: req.params.date
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
});


module.exports = statistics;
