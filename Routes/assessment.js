const express = require("express");
const moment = require("moment");
const Assessment = require("../Models/Assessment");
// const bcrypt = require("bcrypt");
// const Users = express.Router();
const jwt = require("jsonwebtoken");
const { fn, col, QueryTypes } = require("sequelize");
const { sequelize } = require("../Database/db");
const assessment = express.Router();

assessment.post("/AssessmentInput", async (req, res) => {
  try {
    let ass = await Assessment.create(req.body);
    return res.json(ass);
  } catch (e) {
    return res.json({ e: e });
  }
});

assessment.get("/ShowDataAssessment", async (req, res) => {
  try {
    return res.json(
      await sequelize.query(
        "select ROUND(avg((Q1+Q2+Q3+Q4+Q5+Q6)/6.0*2.0),2) as total_score,a.ID_User,Period,Customer_id,CONCAT(u.FirstName,' ',u.LastName) as FullName from assessment as a join users as u on u.ID_User = a.ID_User GROUP BY a.ID_User Order by total_score DESC",
        { type: QueryTypes.SELECT }
      )
    );
  } catch (e) {
    console.log(e);
  }
});

assessment.get("/ShowDataAssessmentDetails/:id", async (req, res) => {
  try {
    return res.json(
      await sequelize.query(
        `select ROUND(avg((Q1+Q2+Q3+Q4+Q5+Q6)/6.0*2.0),2) as total_score,ROUND(avg(Q1)*2.0,2) as Q1 ,ROUND(avg(Q2)*2.0,2) as Q2 ,ROUND(avg(Q3)*2.0,2) as Q3 ,ROUND(avg(Q4)*2.0,2) as Q4,ROUND(avg(Q5)*2.0,2) as Q5,ROUND(avg(Q6)*2.0,2) as Q6,a.ID_User,Period,Customer_id,CONCAT(u.FirstName,' ',u.LastName) as FullName from assessment as a join users as u on u.ID_User = a.ID_User Where a.ID_User = ${req.params.id}   `,
        { type: QueryTypes.SELECT }
      )
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = assessment;
