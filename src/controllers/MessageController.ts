import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMessageService from "../Interfaces/IMessageService.js";
import MessageDto from "../DTO/MessageDto.js";
import ChatDto from "../DTO/ChatDto.js";

@injectable()
export default class UserController {
  private readonly _messageService: IMessageService;
  public constructor(
    @inject("IMessageService")
    messageService: IMessageService
  ) {
    this._messageService = messageService;
  }
  public async getMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const messageDto = await this._messageService.getById(message.id);
      res.status(200).json({
        message: "Your message was getted with success",
        token: messageDto,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Message create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async postMessage(req: Request, res: Response) {
    try {
      const { chat } = req.body;
      const { user } = req.body;
      const { message } = req.body;
      const messageDto = new MessageDto({ content: message.content as string });
      const newMessage = await this._messageService.sendMessage(
        user.id,
        chat.id,
        messageDto
      );
      res.status(200).json({
        message: "you send the message with success",
        content: newMessage,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Message create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const { message } = req.body;

      const isMessageDeleted = await this._messageService.deleteMessage(
        user.id,
        message.id
      );
      if (!isMessageDeleted) {
        res.status(400).json({
          message: "your message wasn't deleted",
        });
      }

      res.status(200).json({
        message: "you message was deleted with success",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Message create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async updateMessage(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const { message } = req.body;
      const messageDto = new MessageDto({id:message.id,content:message.content})
      const isMessageUpdated = await this._messageService.updateMessage(
        user.id,
        messageDto
      );
      if (!isMessageUpdated) {
        res.status(400).json({
          message: "your message wasn't updated",
        });
      }

      res.status(200).json({
        message: "you message was updated with success",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Message update failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }
}

const errorResponseGetted = (res: Response, error: any, message: string) => {
  if (error instanceof CustomError) {
    console.error("Message create failed:", error.message);
    res.status(error.statusHttp).json({ error: error.message });
    return;
  }
};
