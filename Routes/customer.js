const express = require("express");
const moment = require("moment");
const Customer = require("../Models/Customer");
const bcrypt = require("bcrypt");
// const Users = express.Router();
const jwt = require("jsonwebtoken");
const { fn, col } = require("sequelize");
const customer = express.Router();
const customer_ch = express.Router();

// const Posittion = require('../Models/Posttions') ;





customer.get("/VerifyIdentity", async (req, res) => {

  const customer = await Customer.findOne({
    where: {
      FullName_c : req.query.FullName_c || "",
      PhoneNumber : req.query.PhoneNumber || ""
    },
   
  });
  return res.json({ data:customer });

  // if (user) {
  //   if (await bcrypt.compare(password, user.Password)) {
  //     return res.json({
  //       token: await jwt.sign(user.toJSON(), "kuay"),
  //       data: user,
  //     });
  //   }
  // }
  // return res.json({ error: "Username is incorrect!" });
});





customer.put("/VerifyIdentityCheck/:id", async (req, res) => {
  
    const customer_ch = await Customer.update(
      {
        ...req.body,
        
      },
      {
        where: {
          Customer_id: req.params.id,
        },
      }
    );
    return res.json({ data:customer_ch });
});

module.exports = customer;

