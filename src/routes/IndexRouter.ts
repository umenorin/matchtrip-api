import { Request, Response } from "express";
import { Router } from "express";
import userRouter from "./UsersRouter.js";
import travelRouter from "./TravelRouter.js";
import messageRouter from "./MessageRouter.js";
import ratingRouter from "./RatingRouter.js";
import categoryRouter from "./CategoryRouter.js";
import chatRouter from "./ChatRouter.js";
import matchRouter from "./MatchRouter.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    endpoints: {
      users: {
        userEndpoints: {
          createUser: "POST /users/signup",
          loginUser: "POST /users/login",
          getUser: "GET /users/:id",
          updateUser: "PATCH /users/edit/:id",
          deleteUser: "DELETE /users/delete/:id",
        },
      },
      travels: {
        travelEndpoints: {
          createTravel: "POST /travel/create",
          updateTravel: "PUT /travel/update",
          deleteTravel: "DELETE /travel/delete",
          getTravel: "GET /travel/getTravel/:id",
          getManyTravels: "GET /travel/getTravels",
        },
      },
      messages: {
        messageEndpoints: {
          getMessage: "GET /message/getMessage",
          sendMessage: "POST /message/sendMessage",
          deleteMessage: "DELETE /message/deleteMessage",
          updateMessage: "PATCH /message/updateMessage",
        },
      },
      ratings: {
        ratingEndpoints: {
          sendRating: "POST /rating/sendRating",
          getRating: "GET /rating/getRating",
        },
      },
      categories: {
        categoryEndpoints: {
          createCategory: "POST /category/create",
          getAllCategories: "GET /category",
          getCategoryById: "GET /category/:id",
          sendForTravel: "POST /category/sendForTravel/:id",
          sendForUser: "POST /category/sendforUser/:id",
        },
      },
      chats: {
        chatEndpoints: {
          getChatOfTravel: "GET /chat/:id",
        },
      },
      matches: {
        matchEndpoints: {
          sendProbablyMatch: "POST /match/:id",
          getMatchByTraveler: "GET /match/matchsByTraveler/:id",
          getMatchByTravel: "GET /match/matchsByTravel/:id",
          recuseMatch: "POST /match/recuseMatch/:id",
          acceptMatch: "POST /match/acceptMatch/:id",
        },
      },
    },
  });
});

router.use("/users", userRouter);
router.use("/travel", travelRouter);
router.use("/message", messageRouter);
router.use("/rating", ratingRouter);
router.use("/category", categoryRouter);
router.use("/chat", chatRouter);
router.use("/match", matchRouter);
export default router;
