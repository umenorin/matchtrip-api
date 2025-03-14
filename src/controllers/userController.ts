import { Request, Response } from "express";
import IUserService from "../Interfaces/IUserService.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import { container, inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";
@injectable()
export default class UserController {
  private readonly _userService:IUserService;
  public constructor(
    @inject("IUserService") 
    userService: IUserService
  ) {
    this._userService = userService
  }
  

  public async postUser(req: Request, res: Response) {
    try {
      const { user } = req.body;

      const userDto = new UserDtoRequest(user)

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

  public async getUser(req:Request,res:Response){
    try{
      const {user} = req.body;
      

    }catch(err:any){
      res.status(err.statusHttp).json({
        message: "A error has occurred",
        error: err.message,
      });
    }
  }

  public async updateUser(req:Request,res:Response){

  }

  public async deleteUser(req:Request,res:Response){

  }
}
