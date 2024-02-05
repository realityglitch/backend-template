import "reflect-metadata";
import "dotenv/config";

import { GraphQLServer } from "./config/server";
import { AppDataSource } from "./data-source";

const startServer = async () => {
  AppDataSource.initialize()
    .then(async () => {
      const graphqlServer = new GraphQLServer();

      graphqlServer.start((port) => {
        console.log(`Server started on port ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

startServer();
