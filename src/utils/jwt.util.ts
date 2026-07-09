import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";

export interface AccessTokenPayload extends JwtPayload {
  sub: string; // User uuid
  email: string; // User email
}

export const signToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: "1h",
    algorithm: "HS256",
    issuer: "expense-api",
    audience: "expense-client",
  });
};

export const verifyToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, config.JWT_SECRET_KEY, {
    algorithms: ["HS256"],
    issuer: "expense-api",
    audience: "expense-client",
  }) as AccessTokenPayload;
};
