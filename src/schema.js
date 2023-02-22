import {makeExecutableSchema} from "@graphql-tools/schema";

import {typeDef} from "./typedef/typedef.js";
import {resolvers} from "./resolvers/index.js";

const schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolvers,
});

export {schema as default};
