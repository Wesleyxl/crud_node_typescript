import { Request, Response } from "express";
import AuthService from "../Service/AuthService";
import Controller from "./Controller";

class AuthController extends Controller {
  public async login(req: Request, res: Response) {
    try {
      // validating fields
      const isValidate = Controller.validation(req.body);

      if (!isValidate) {
        return res.status(401).json({
          success: true,
          message: "Email and password is required",
        });
      }

      // login services
      const { email, password } = req.body;
      const response = await AuthService.login(email, password);

      if (!response.success) {
        return res.status(401).json({
          success: false,
          message: response.message,
        });
      }

      return res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }
  }

  // register new user
  public async register(req: Request, res: Response) {
    try {
      // validating fields
      const isValidate = Controller.validation(req.body);

      if (!isValidate) {
        return res.status(401).json({
          success: false,
          message: "Email and password is required",
        });
      }

      // creating new user
      const { name, email, password } = req.body;
      const response = await AuthService.registerService(name, email, password);

      if (!response.success) {
        return res.status(401).json({
          success: false,
          message: response.message,
        });
      }

      return res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error,
      });
    }
  }

  // me
  public async me(req: Request, res: Response) {
    try {
      // get user using token access
      const id = res.locals.auth_data.id;
      const response = await AuthService.me(id);

      if (!response.success) {
        return res.status(401).json({
          success: false,
          message: response.message,
        });
      }

      return res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

export default new AuthController();
