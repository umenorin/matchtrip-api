import IUserService from "../Interfaces/IUserService.js";
import { User } from "../models/User.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import IUserRepository from "../Interfaces/IUserRepository.js";
import { CustomError } from "../errors/CustomError.js";
import { container, inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository.js";

@injectable()
class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async createUser(user: UserDtoRequest): Promise<void> {
    let verifyUserExist = false;
    if (user.email && user.uniqueIdentification) {
      verifyUserExist = await this._userRepository.findUserExist(
        user.email,
        user.uniqueIdentification
      );
    }
    if (verifyUserExist) {
      throw new CustomError("Email or Unique Identification already used", 405);
    }
    await this._userRepository.register(user);
  }

    deleteUser(id: string): void {
        throw new Error("Method not implemented.");
    }
    editUser(user: UserDtoRequest): void {
        throw new Error("Method not implemented.");
    }
}

export default UserService;