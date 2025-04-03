import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./UsersRouter.js";
import travelRouter from "./TravelRouter.js";

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

router.use("/users", userRouter);
router.use("/travel", travelRouter);

export default router;
