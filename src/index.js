import {GraphQLServer} from "graphql-yoga";

import schema from "./schema.js";
import prisma from "./prisma.js";
import env from "dotenv";

const server = new GraphQLServer({
  schema,
  context(request) {
    return {
      prisma,
      request,
    };
  },
});

server.start(({port}) => {
  console.log(`Server: http://localhost:${port}`);
}).then(() => {
  env.config();
});
