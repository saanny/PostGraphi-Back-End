import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const app = express();
  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  appoloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server started on localhost 4000");
  });
};
main().catch((err) => {
  console.log(err);
});
