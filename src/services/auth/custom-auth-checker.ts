import { Request } from "express";
import { AuthChecker } from "type-graphql";
import JwtService from "./jwt";

export const customAuthChecker: AuthChecker = async (
  {
    root,
    args,
    context,
    info,
  }: {
    root: any;
    args: any;
    info: any;
    context: {
      req: Request;
    };
  },
  roles
) => {
  const token = context.req.headers?.authorization
    ? context.req.headers.authorization.split(" ")[1]
    : null;
  if (!token) return false;
  const jwt = new JwtService();

  try {
    await jwt.verify(token);
    // if (roles.length === 0) {
    //   return user;
    // }
    // if (roles.includes(user.role)) {
    //   return true;
    // }
    return true;
  } catch (e) {
    return false;
  }
};
