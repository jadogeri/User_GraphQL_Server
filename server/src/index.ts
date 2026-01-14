import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { UserResolver } from "./user/user.resolver";


async function bootstrap() {
    // 1. Initialize TypeORM connection
    await AppDataSource.initialize()
        .then(() => console.log("🔥 Data Source has been initialized!"))
        .catch((err) => console.error("Error during Data Source initialization", err));

    // 2. Build GraphQL Schema (using type-graphql for code-first)
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: true, // This enables the auto-generation
        
    });

    // 3. Create Apollo Server
    const server = new ApolloServer({ schema });

    // 4. Start Server
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at: ${url}`);
}

bootstrap();