import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express, {Express} from "express";
import {graphqlHTTP} from "express-graphql";
import connectDB from "../config/db";
import schema from "./schema/schema";

dotenv.config();
const port = process.env.PORT || 5050;
const app: Express = express();

app.use(cors());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () =>
  console.log(
    chalk.cyan.underline(
      `⚡️[server]: Server is running at http://localhost:${port}`
    )
  )
);
