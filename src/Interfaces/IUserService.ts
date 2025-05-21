import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

interface IUserService {
  // For resolve the problem for create a new user and set the databas
  createUser(user: UserDtoRequest): Promise<UserDtoResponse>;
  //For resolve the problem for remove the user
  deleteUser(id: string): void;
  editUser(id: string, user: UserDtoRequest): void;
  login(user: UserDtoRequest): void;
  getUser(user: string): Promise<UserDtoResponse>;
}

export default IUserService;
