const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const users = require("./Routes/user");
const customer = require("./Routes/customer");
const assessment = require("./Routes/assessment");
const assigntasks = require("./Routes/assigntasks");
const statistics = require("./Routes/statistics");
const gueue = require("./Routes/gueue");
const upload = require("./Routes/upload");
const { sendPushNotification } = require("./functions/NingngLovePussy");
const { Op } = require("sequelize");
const Users = require("./Models/Users");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use(users);
app.use(customer);
app.use(assessment);
app.use(assigntasks);
app.use(gueue);
app.use(upload);
app.use(statistics);
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // console.log(socket.id + " a user connected :D");
  socket.on("queueUpdate", (q) => {
    io.emit("queueUpdate", q);
  });
  socket.on("notify", (q) => {
    Users.findAll({
      where: {
        token: {
          [Op.not]: null,
        },
        ID_User: {
          [Op.not]: q.ID_User,
        },
        notifyStatus: 1,
      },
    }).then((result) => {
      let promises = result.map((item) =>
        sendPushNotification(
          item.token,
          "แจ้งเตือน",
          "หมายเลขปัจจุบัน "+ q.nqueue + 
          "\nหมายเลข "+ q.ID_User + " ออกไปทำงานแล้ว"+
          "\nจำนวนการต่อคิว "+ q.allqueue + " คน "+
          "\nจำนวนนักกอล์ฟคงเหลือ"+ q.Number_Services + "คน" 
        )
      );
      Promise.all(promises).then((result) => {
        console.log(result.map((item) => item.data));
      });
    });
  });
  io.on("disconnection", (data) => {
    socket.disconnect();
  });
});
server.listen(5000, () => console.log("server running on port:" + 5000));
