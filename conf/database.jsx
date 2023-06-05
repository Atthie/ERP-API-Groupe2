const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Erp", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .sync()
  .then(() => {
    console.log("salut  tu es connecté à la bdd");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
