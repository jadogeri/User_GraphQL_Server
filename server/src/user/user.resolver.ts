/**
 * @author Joseph Adogeri
 * @version 1.0.0
 * @since 2024-06-10
 * @filename user.resolver.ts
 * @file User Resolver Implementation using TypeGraphQL and TypeORM
 */

import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { User } from "./user.entity";

@Resolver()
export class UserResolver {
  // Read operation (Query)
/**
   * Retrieves a list of all users from the database.
   * @returns A promise that resolves to an array of User objects.
   * @throws Will throw an error if the database query fails.
   */
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
/**
   * Creates a new user with the provided details and saves it to the database.
   * 
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param email - The email address of the user.
   * @param password - The password for the user account.
   * @returns A promise that resolves to the created User object.
   * @throws Error if the user cannot be saved to the database.
   */
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
/**
   * Updates the user with the specified ID. Only the provided fields will be updated.
   * If the user is not found, returns null.
   * 
   * @param id - The ID of the user to update.
   * @param firstName - The new first name of the user (optional).
   * @param lastName - The new last name of the user (optional).
   * @param email - The new email of the user (optional).
   * @param password - The new password of the user (optional).
   * @returns The updated user object or null if the user was not found.
   * @throws Error if there is an issue saving the user.
   */
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
