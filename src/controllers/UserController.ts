import { Request, Response } from "express";
import IUserService from "../Interfaces/IUserService.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import { inject, injectable } from "tsyringe";

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
      console.log("user: ",user)
      const userDto = new UserDtoRequest(user);

      await this._userService.createUser(userDto);
      res.status(200).json({
        message: "sucessful",
        body: user,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({
        message: "A error has occurred",
        error: err.message,
      });
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
    } catch (err: any) {
      res.status(err.statusHttp || 500).json({
        message: "An error has occurred",
        error: err.message,
      });
    }
  }

  public async updateUser(req: Request, res: Response) {}

  public async deleteUser(req: Request, res: Response) {}
}
