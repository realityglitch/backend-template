import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class EnterpriseUserType {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginReturn {
  @Field()
  token: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
