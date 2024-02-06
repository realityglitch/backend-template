import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Resolvers from "../resolvers";
import { customAuthChecker } from "../services/auth/custom-auth-checker";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }

  getExpress(): express.Application {
    return this.app;
  }
}

export class GraphQLServer {
  public server: ApolloServer;

  constructor() {}

  async start(callback: (port: number) => void) {
    const schema = await buildSchema({
      resolvers: Resolvers,
      validate: false,
      authChecker: customAuthChecker,
      // emitSchemaFile: {
      //   path: __dirname + "/schema.graphql",
      //   sortedSchema: false,
      // },
    });

    this.server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });
    // Move this port to a configuration file
    const expressInstance = new Server(Number(process.env?.PORT) || 3010);
    const server = expressInstance.getExpress();
    await this.server.start();
    this.server.applyMiddleware({ app: server, path: "/graphql" });

    expressInstance.start(() => {
      callback(process.env?.PORT ? Number(process.env.PORT) : 3010);
    });
  }
}
