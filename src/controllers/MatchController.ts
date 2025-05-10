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
    try {
      const { match } = req.body;
      const matchDto = await this._matchService.getById(match.id);
      res.status(200).json({
        match: "Your match was getted with success",
        token: matchDto,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Match create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async sendProbavlyMatch(req: Request, res: Response) {
    try {
      const { travel } = req.body;
      res.status(200).json({
        match: "you send the match with success",
        content: newMatch,
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
    try {
      const { user } = req.body;
      const { match } = req.body;

      const isMatchDeleted = await this._matchService.deleteMatch(
        user.id,
        match.id
      );
      if (!isMatchDeleted) {
        res.status(400).json({
          match: "your match wasn't deleted",
        });
      }

      res.status(200).json({
        match: "you match was deleted with success",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Match create failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }

  public async updateMatch(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const { match } = req.body;
      const matchDto = new MatchDto({ id: match.id, content: match.content });
      const isMatchUpdated = await this._matchService.updateMatch(
        user.id,
        matchDto
      );
      if (!isMatchUpdated) {
        res.status(400).json({
          match: "your match wasn't updated",
        });
      }

      res.status(200).json({
        match: "you match was updated with success",
      });
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Match update failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
    }
  }
}

const errorResponseGetted = (res: Response, error: any, match: string) => {
  if (error instanceof CustomError) {
    console.error("Match create failed:", error.message);
    res.status(error.statusHttp).json({ error: error.message });
    return;
  }
};
