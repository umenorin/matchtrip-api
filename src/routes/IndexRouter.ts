import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./UsersRouter.js";
import travelRouter from "./TravelRouter.js";
import messageRouter from "./MessageRouter.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    endpoints: {
      users: {
        userEndpoints: {
          getUsers: "/users",
          createUser: "/users/singup",
          loginUser: "/users/login",
	  editUser: "/users/edit/:id",
	  deleteUser: "/users/delete/:id",
        },
      },
    },
  });
});

router.use("/users", userRouter);
router.use("/travel", travelRouter);
router.use("/message",messageRouter)

export default router;
