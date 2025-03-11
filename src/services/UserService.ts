import IUserService from "../Interfaces/IUserService.js";
import { User } from "../models/User.js";
import UserDto from "../DTO/UserDtoRequest.js";
import IUserRepository from "../Interfaces/IUserRepository.js";

class UserService implements IUserService {
  constructor(private _userRepository: IUserRepository) {}

  async createUser(user: UserDto): Promise<void> {
    const verifyUserExist = await this._userRepository.findUserExist(
      user.email,
      user.uniqueIdentification
    );
    if (verifyUserExist) {
      throw new Error("Email or Unique Idedntification alrady used");
    }
    await this._userRepository.register(user);
  }

  deleteUser(id: string): void {
    throw new Error("Method not implemented.");
  }
  editUser(user: UserDto): void {
    throw new Error("Method not implemented.");
  }
}

export default UserService;
