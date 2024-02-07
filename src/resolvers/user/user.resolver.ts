import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  CreateUserInput,
  EnterpriseUserType,
  LoginInput,
  LoginReturn,
} from "./SDL/user";
import { EnterpriseUser } from "../../entity/enterprise-user";
import bcrypt from "bcrypt";
import JwtService from "../../services/auth/jwt";
import { EnterpriseUserLogs } from "../../entity/enterprise-user-logs";

@Resolver(EnterpriseUserType)
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createUser(@Arg("input") input: CreateUserInput) {
    try {
      console.log(input);
      const user = new EnterpriseUser();

      user.firstName = input.firstName;
      user.lastName = input.lastName;
      user.isActive = input.isActive;
      user.email = input.email;

      // Hash the password with bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(input.password, salt);

      await user.save();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => LoginReturn)
  async login(@Ctx() ctx, @Arg("input") input: LoginInput) {
    const user = await EnterpriseUser.findOne({
      where: { email: input.email },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      throw new Error("Invalid email or password");
    }
    const jwt = new JwtService();
    const userLog = new EnterpriseUserLogs();

    userLog.userId = user.id;
    userLog.loginTime = new Date();
    userLog.ipAddress = ctx.req.ip || ctx.req.connection.remoteAddress;

    await userLog.save();
    const token = await jwt.sign({
      email: user.email,
      id: user.id,
      isActive: user.isActive,
    });
    return {
      token,
    };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx) {
    const userLog = await EnterpriseUserLogs.findOne({
      where: { userId: ctx.req.user.id },
      order: { loginTime: "DESC" },
    });

    userLog.logoutTime = new Date();
    await userLog.save();
    return true;
  }
}
