import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./UsersRouter.js";
import travelRouter from "./TravelRouter.js";
import messageRouter from "./MessageRouter.js";
import ratingRouter from "./RatingRouter.js";
import categoryRouter from "./CategoryRouter.js";
import chatRouter from "./ChatRouter.js";

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
router.use("/rating", ratingRouter);
router.use("/category",categoryRouter)
router.use("/chat", chatRouter);
export default router;
