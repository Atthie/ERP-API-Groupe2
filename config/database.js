import { Sequelize } from "sequelize";

const db = new Sequelize("Erp", "postgres", "mamita", {
  host: "localhost",
  dialect: "postgres"
});
export default db;
