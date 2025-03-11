import { User } from "../models/User.js";
import UserDto from "../DTO/UserDtoRequest.js";

interface IUserService {
  createUser(user: UserDto): void;
  deleteUser(id: string): void;
  editUser(user: UserDto): void;
}

export default IUserService;
