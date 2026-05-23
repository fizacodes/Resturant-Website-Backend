
import serverless from "serverless-http";
import app from "../app.js";
import connectdb from "../config/connectdb.js";

const handler = serverless(app);

export default async (req, res) => {
  await connectdb();
  return handler(req, res);
};

