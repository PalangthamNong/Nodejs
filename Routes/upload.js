const express = require("express");
const multer = require("multer");
const Users = require("../Models/Users");
const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/profile",
    filename: function (req, file, cb) {
      //req.body is empty...
      //How could I get the new_file_name property sent from client here?
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});
router.put(
  "/userProfile/:id",

  upload.single("image"),
  async function (req, res, next) {
    try {
      await Users.update(
        {
          Image: req.file.filename,
        },
        {
          where: {
            ID_User: req.params.id,
          },
        }
      );

      return res.status(200).json(
        await Users.findOne({
          where: {
            ID_User: req.params.id,
          },
        })
      );
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
    } catch (e) {
      console.log(e);
      return res.status(500).json({});
    }
  }
);

module.exports = router;
