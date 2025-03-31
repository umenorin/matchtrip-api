import "reflect-metadata";
import "./container/index.js";

import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes/index.routes.js";
import mongoosedb from "./database/mongodbMongoose.js";
import cors from "cors";

const app = express();

// Initializing the database
mongoosedb()

app.use(
  cors({
    origin: "http://localhost:5173", // Apenas seu frontend
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
