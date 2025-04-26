import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

interface IUserService {
  // For resolve the problem for create a new user and set the databas
  createUser(user: UserDtoRequest): void;
  //For resolve the problem for remove the user
  deleteUser(id: string): void;
  editUser(user: UserDtoRequest): void;
  login(user: UserDtoRequest): void;
  getUser(user: UserDtoRequest): Promise<UserDtoResponse>;
}

export default IUserService;
