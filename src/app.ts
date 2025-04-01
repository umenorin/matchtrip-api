import "reflect-metadata";
import "./DI-container.js";

import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes/IndexRouter.js";
import mongoosedb from "./database/MongoDbMongoose.js";
import cors from "cors";

const app = express();

// Initializing the database
mongoosedb();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// This route, serve just for text the backend is running correctly
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
