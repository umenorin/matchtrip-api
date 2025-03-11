import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./users.routes.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    endpoints: {
      users: {
        userEndpoints: {
          getUsers: "/users",
          createUser: "/users/singup",
          loginUser: "/users/login",
        },
      },
    },
  });
});

router.use("/users",userRouter);

export default router;
