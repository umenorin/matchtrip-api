import "reflect-metadata"
import "./container/index.js"

import express, { Request, Response } from "express";
import "dotenv/config";
import router from "../src/routes/index.routes.js"
import mongoosedb from "./database/mongodbMongoose.js";


const app = express();

//Initializing the database
mongoosedb().then(() => {
  console.log('Banco de dados conectado com sucesso!');
}).catch((error) => {
  console.error('Falha ao conectar ao banco de dados:', error);
});


app.use(express.json())

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

app.use("/api",router)

app.listen(3000);


export default app;
