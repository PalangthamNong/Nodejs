const Sequelize = require("sequelize");
const db = {};

try {
  const sequelize = new Sequelize("caddymanagementsystem", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
} catch (e) {
  console.error(e.message);
}
module.exports = db;
