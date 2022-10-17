import JWT from "jsonwebtoken";

import jwtConfig from "../config/jwt";

const CreateUserToken = (userId) => {
  JWT.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expire_in,
  });
};

export default CreateUserToken;
