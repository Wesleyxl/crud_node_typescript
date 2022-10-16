import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import jwtConfig from "../../config/jwt";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.headers.authorization;

  if (!access_token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  jwt.verify(access_token, jwtConfig.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // saving token
    res.locals.auth_data = decoded;

    return next();
  });
};

export default Auth;
