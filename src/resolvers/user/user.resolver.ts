import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, EnterpriseUserType } from "./SDL/user";
import { EnterpriseUser } from "../../entity/enterprise-user";
import bcrypt from "bcrypt";

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
}
