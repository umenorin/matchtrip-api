import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMatchService from "../Interfaces/IMatchService.js";
import ChatDto from "../DTO/ChatDto.js";

@injectable()
export default class UserController {
  private readonly _matchService: IMatchService;
  public constructor(
    @inject("IMatchService")
    matchService: IMatchService
  ) {
    this._matchService = matchService;
  }
  public async getMatch(req: Request, res: Response) {
    
  }

  public async sendProbavlyMatch(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { travel } = req.body;
  
      const matchDto = await this._matchService.createProbablyMatch(userId,travel.id)
      res.status(200).json({
        match: "you send the match with success",
        content: matchDto,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Match create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async deleteMatch(req: Request, res: Response) {
     
  }

  public async updateMatch(req: Request, res: Response) {
    
}
}