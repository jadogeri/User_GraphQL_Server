import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity { // BaseEntity provides static methods like .find(), .save() etc.
  @Field(() => ID) // Exposes 'id' to GraphQL as an ID type
  @PrimaryGeneratedColumn() // TypeORM primary key
  id!: number;

  @Field(() => String) // Exposes 'firstName' to GraphQL
  @Column({ type: "varchar", nullable: false }) // TypeORM column
  firstName!: string;

  @Field(() => String)
  @Column({ type: "varchar", nullable: false })
  lastName!: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, nullable: false }) // Ensures unique emails in DB
  email!: string;

  // Password column is in the database but NOT exposed via @Field() in GraphQL
  @Field(() => String)
  @Column({ type: "varchar", nullable: false })
  password!: string;
}
