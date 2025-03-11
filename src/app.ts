import express, { Request, Response } from "express";
import "dotenv/config";
import router from "../src/routes/index.routes.js";
import mongoosedb from "./database/mongodbMongoose.js";

const app = express();

mongoosedb();

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.json({
    message: "Welcome to the login system",
    endpoints: {
      index: {
        default: "/api",
        userEndpoints: {
          getUsers: "/users",
        },
      },
    },
  });
});

app.use("/api", router);

app.listen(3000);

export default app;
