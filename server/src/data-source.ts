import { DataSource } from "typeorm";
import { User } from "./user/user.entity";

export const AppDataSource = new DataSource({
    type: "better-sqlite3", // or "mysql", "sqlite", etc.
    database: process.env.DB_DATABASE || "userDB.sqlite",
    synchronize: true, // Use carefully in production
    logging: false,
    entities: [User], // List your entities here
    migrations: [],
    subscribers: [],
});
