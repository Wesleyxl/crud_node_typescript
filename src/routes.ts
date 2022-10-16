import { Router } from "express";

import AuthController from "./App/Controller/AuthController";

const routes = Router();

routes.post("/auth/login", AuthController.login);
routes.post("/auth/register", AuthController.register);

export default routes;
