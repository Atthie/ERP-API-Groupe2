import { Sequelize } from "sequelize";

const db = new Sequelize("Erp", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres"
});
export default db;
