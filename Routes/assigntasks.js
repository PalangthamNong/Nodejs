const express = require("express");
const moment = require("moment");
const Assigntasks = require("../Models/Assigntasks");
// const bcrypt = require("bcrypt");
// const Users = express.Router();
const jwt = require("jsonwebtoken");
const { fn, col, QueryTypes } = require("sequelize");
const { sequelize } = require("../Database/db");
const assigntasks = express.Router();

assigntasks.post("/AssigntasksInput", async (req, res) => {
  try {
    let ass = await Assigntasks.create(req.body);
    return res.json(ass);
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});

assigntasks.get("/AssigntasksAll/:id", async (req, res) => {
  try {
    return res.json(await Assigntasks.findAll({
      where:{
        ID_User:req.params.id
      }
    }));
  } catch (e) {
    console.log(e);
    return res.json({ e: e });
  }
});
module.exports = assigntasks;
