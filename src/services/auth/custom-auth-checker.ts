import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker = (
  { root, args, context, info },
  roles
) => {
  console.log(root, args, context, info, roles);
  return false;
};
