import { Sequelize } from "Sequelize";
// import dbConfig from "../config/database.json";

const sequelize = new Sequelize({
  database: "node_api_typescript",
  username: "root",
  password: "",
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
