import express from "express";
import cors from "cors";

import routes from "./routes";
import database from "./database";

class App {
  public express: express.Application;
  private databaseConnection;

  public constructor() {
    this.express = express();

    this.middleware();
    this.database();
    this.routes();
  }

  private middleware() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database() {
    this.databaseConnection = database;
  }

  private routes() {
    this.express.use("/api", routes);
  }
}

export default new App().express;
