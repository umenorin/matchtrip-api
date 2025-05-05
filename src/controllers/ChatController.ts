// src/controllers/chatController.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IChatService from "../Interfaces/IChatService.js";

export default class chatController {
  private _chatservice: IChatService;

  constructor() {
    this._chatservice = container.resolve<IChatService>("IChatService");
  }

  async getchatOfTravel(req: Request, res: Response) {
    try {
      const chat = req.body.chat ? req.body.chat : req.body.travel.chat;
      if (!chat) {
        res.status(400).json({
          message: "this doesn't exist",
        });
      }

      const chatUpdated = await this._chatservice.getchat(chat.id);
      res.status(200).json({
        message: "chat getted with success",
        token: chatUpdated,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.error("chat insert failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }
}
