import { Request, Response } from "express";
import IUserService from "../Interfaces/IUserService.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";

@injectable()
export default class UserController {
  private readonly _userService: IUserService;
  public constructor(
    @inject("IUserService")
    userService: IUserService
  ) {
    this._userService = userService;
  }

  public async postUser(req: Request, res: Response) {
    try {
      const { user } = req.body;
      console.log("user: ", user);
      const userDto = new UserDtoRequest(user);

      await this._userService.createUser(userDto);
      res.status(200).json({
        message: "sucessful",
        body: user,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.error("Travel edit failed:", error.message);
        res
          .status(error.statusHttp)
          .json({ message: error.message, error: error.message });
        return;
      }
    }
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const userDto = new UserDtoRequest(user);
      const userResponse = await this._userService.login(userDto);
      res.status(200).json({
        message: "Success!",
        token: userResponse,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.error("Travel edit failed:", error.message);
        res
          .status(error.statusHttp)
          .json({ message: error.message, error: error.message });
        return;
      }
    }
  }

  public async updateUser(req: Request, res: Response) {}

  public async deleteUser(req: Request, res: Response) {}
}
