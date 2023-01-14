const mongoose = require("mongoose");
import chalk from "chalk";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    chalk.cyan.underline(
      `⚡️[Database]: MongoDB is running at ${conn.connection.host}`
    )
  );
};

export default connectDB;
