const express = require("express");
const Queue = require("../Models/Queueing");
const NumberServices = require("../Models/NumberServices");
// const bcrypt = require("bcrypt");
// const Users = express.Router();
const jwt = require("jsonwebtoken");
const { fn, col, QueryTypes, Op } = require("sequelize");
const { sequelize } = require("../Database/db");
const Users = require("../Models/Users");

const queue = express.Router();

queue.post("/Number_Services", async (req, res) => {
  try {
    let date = new Date();
    let ass;
    var datestr = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`.substr(0, 10);
    console.log(datestr);
    NumberServices.findOne({
      where: {
        QDate: datestr,
      },
    }).then(async (resu) => {
      if (!resu) {
        return res.json({
          data: await NumberServices.create(req.body),
          message: "บันทึกสำเร็จ",
        });
      } else {
        return res.json({ message: "มีการบันทึกไปแล้ว" });
      }
    });
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

queue.get("/Number_ServicesShow", async (req, res) => {
  try {
    let date = new Date();
    console.log(datestr);
    var datestr = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`.substr(0, 10);
    console.log(datestr);
    let data = await NumberServices.findOne({
      where: {
        QDate: datestr,
      },
    });
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

queue.put("/UpdateNumber_Services/:id", async (req, res) => {
  try {
    console.log(req.body);
    const date = new Date();
    console.log("update...");
    const data = await NumberServices.update(
      {
        // ...req.body.data,
        Number_Services: req.body.numberService,
      },
      {
        where: {
          Number_Services: req.params.id,
          QDate: date.toISOString(),
        },
      }
    );
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
});

queue.post("/InputQueueing", async (req, res) => {
  try {
    Queue.findOne({
      where: {
        Queue_Now: req.body.Queue_Now,
      },
    }).then(async (result) => {
      if (!result) {
        Queue.findOne({
          where: {
            Queue_Now: {
              [Op.lt]: req.body.Queue_Now,
            },
          },
        }).then(async (result2) => {
          if (result2) {
            let ass = await Queue.create({
              ...req.body,
              prority: req.body.Queue_Now,
            });
            return res.json({ data: ass, message: "สำเร็จ" });
          }
          Queue.findOne().then(async (result) => {
            if (result) {
              let ass = await Queue.create({
                ...req.body,
                prority: 1 + req.body.Queue_Now,
              });
              return res.json({ data: ass, message: "สำเร็จ" });
            } else {
              let ass = await Queue.create({
                ...req.body,
                prority: req.body.Queue_Now,
              });
              return res.json({ data: ass, message: "สำเร็จ" });
            }
          });
          // let ass = await Queue.create({
          //   ...req.body,
          //   prority: 1 + req.body.Queue_Now,
          // });
          // return res.json({ data: ass, message: "สำเร็จ" });
        });
      } else {
        return res.json({ message: "ไม่สามารถกดต่อคิวได้เนื่องจากท่านอยู่ในคิวอยู่แล้ว" });
      }
    });
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

queue.get("/ShowQueueingNow", async (req, res) => {
  try {
    Queue.belongsTo(Users, { foreignKey: "Queue_Now" });
    return res.json(
      await Queue.findAll({
        order: ["prority"],
        include: [Users],
      })
    );
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

queue.get("/ShowQueueingNow", async (req, res) => {
  try {
    return res.json(
      await Queue.findAll({
        order: ["Queue_Now"],
      })
    );
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

queue.delete("/ExitQueue/:id", async (req, res) => {
  try {
    return res.json(
      await Queue.destroy({
        where: {
          Queue_Now: req.params.id,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = queue;
