const express = require("express");
const moment = require("moment");
const Users = require("../Models/Users");
const bcrypt = require("bcrypt");
// const Users = express.Router();
const jwt = require("jsonwebtoken");
const users = express.Router();
// const Posittion = require('../Models/Posttions') ;
users.get("/find-users", async (req, res) => {
 
  try {
    let user = await Users.findOne({
      where: {
        ID_User: req.query.id,
      },
    });
    return res.json(user);
  } catch (e) {
    console.log(e);
  }
});

users.use((req, res, next) => {
  console.log(req.originalUrl, req.method);
  next();
});

users.post("/post-users", async (req, res) => {
  try {
    let date = req.body.BirthDate.split("/");
    console.log(date);
    const usersData = {
      ...req.body,
      Password: await bcrypt.hash(req.body.Password, 11),
      Birthdate: new Date(`${date[2]}-${date[1]}-${date[0]}`),
      StatusPass: 0,
      // Birthdate:new Date(req.body.Birthdate)
      // ID_User : req.body.ID_User,
      // FirstName : req.body.FirstName,
      // LastName : req.body.LastName,
      // Birthdate : req.body.Birthdate ,
      // Password : req.body.Birthdate  ,
      // Gender :  req.body.Gender    ,
    };
    await Users.destroy({
      where: {
        FirstName: usersData.FirstName,
      },
    });
    let user = await Users.create(usersData);
    console.log(user);
    return res.json(user);
  } catch (e) {
    console.log(e);
  }
});

users.put("/confirm-rights/:id", async (req, res) => {
  try {
    const user = await Users.update(
      {
        ...req.body.user,
      },
      {
        where: {
          ID_User: req.params.id,
        },
      }
    );
    return res.json(user);
  } catch (e) {
    console.log(e);
  }
});

users.get("/confirm-rights", async (req, res) => {
  try {
    return res.json(
      await Users.findAll({
        where: {
          StatusPass: 0,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
});

users.delete("/confirm-rights/:id", async (req, res) => {
  try {
    return res.json(
      await Users.destroy({
        where: {
          ID_User: req.params.id,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
});

users.get("/confirm-rights/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    return res.json(
      await Users.findOne({
        where: {
          ID_User: req.params.id,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
});

users.get("/login", async (req, res) => {
  console.log('test')
  const id = req.query.id;
  const password = req.query.password;
  const user = await Users.findOne({
    where: {
      ID_User: id,
    },
  });
  console.log(user);
  if (user) {
    if (await bcrypt.compare(password, user.Password)) {
      return res.json({
        // token: await jwt.sign(user.toJSON(), "kuay"),
        data: user,
      });
    }
  }
  return res.json({ error: "Username is incorrect!" });
});

users.put("/update/:id", async (req, res) => {
 try{
   console.log(req.params.id);
  let user = await Users.update(req.body, {
    where: {
      ID_User: req.params.id,
    },
  });
  console.log(req.body);
  return res.json(
    await Users.findOne({
      where: {
        ID_User: req.params.id,
      },
    })
  );
 }catch(e){
   console.log(e);
   return res.status(500).json({});
 }
});
module.exports = users;
