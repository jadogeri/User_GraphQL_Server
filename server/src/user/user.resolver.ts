import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { User } from "./user.entity";

@Resolver()
export class UserResolver {
  // Read operation (Query)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  // Read operation (Query by ID)
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | null> {
    return User.findOneBy({ id });
  }

  // Create operation (Mutation)
  @Mutation(() => User)
  async createUser(
    @Arg("firstName", () => String) firstName: string,
    @Arg("lastName", () => String) lastName: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<User> {
    const user = User.create({ firstName, lastName, email, password });
    return user.save();
  }

  // Update operation (Mutation)
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("firstName", () => String, { nullable: true }) firstName?: string,
    @Arg("lastName", () => String, { nullable: true }) lastName?: string,
    @Arg("email", () => String, { nullable: true }) email?: string,
    @Arg("password", () => String, { nullable: true }) password?: string
  ): Promise<User | null> {
    const user = await User.findOneBy({ id });
    if (!user) return null;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
    return user.save();
  }

  // Delete operation (Mutation)
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    const result = await User.delete(id);
    return result.affected! > 0;
  }
}
