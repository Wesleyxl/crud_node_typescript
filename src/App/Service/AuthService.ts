import bcrypt from "bcrypt";
import User from "../Model/User";

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

    if (!user) {
      return {
        success: false,
        message: "Email or password is invalid",
      };
    }

    // validating password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        message: "Email or password is invalid",
      };
    }

    return {
      success: true,
      data: user,
    };
  }
}

export default new AuthService();
