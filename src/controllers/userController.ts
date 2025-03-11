import { Request, Response } from "express";
import IUserService from "../Interfaces/IUserService.js";
import UserDto from "../DTO/UserDtoRequest.js";

const verifyUsedUserData = async (
  email: boolean,
  uniqueIdentificator: boolean
) => {
  let message: string = "";

  if (email) {
    message += "Email already used ";
  }

  if (uniqueIdentificator) {
    message += "Unique Indetificator already used ";
  }

  return message;
};

export default class UserController {
  public constructor(private readonly _userService: IUserService) {}

  public async postUser(req: Request, res: Response) {
    const { user } = req.body;
    try {
      const userDto = new UserDto(user);

      await this._userService.createUser(userDto);
      res.status(200).json({
        message: "sucessful",
        body: user,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({
        message: "A error has occurred",
        error: err,
      });
    }
  }
}
