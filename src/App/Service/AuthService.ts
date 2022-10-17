import bcrypt from "bcrypt";
import User from "../Model/User";
import jwt from "jsonwebtoken";

class AuthService {
  // register new user
  public async registerService(name: string, email: string, password: string) {
    // hashing password
    const passwordHash = await bcrypt.hash(password, 10);

    //create new user
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });

    if (!created) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    return {
      success: true,
      data: user,
    };
  }

  public async login(email: string, password: string) {
    // find if email exists
    const user = await User.findOne({ where: { email } });

    if (user) {
      // validating password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          message: "Email or password is invalid",
        };
      }

      const access_token = await jwt.sign({ id: user.id }, "secret", {
        expiresIn: "1d",
      });

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          access_token: access_token,
        },
      };
    }

    return {
      success: false,
      message: "Email or password is invalid",
    };
  }

  // me
  public async me(id) {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  }
}

export default new AuthService();
