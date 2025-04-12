import UserDto from "../DTO/UserDtoRequest.js";

interface IUserService {
  // For resolve the problem for create a new user and set the databas
  createUser(user: UserDto): void;
  //For resolve the problem for remove the user
  deleteUser(id: string): void;
  editUser(id: string, user:UserDto): void;
  login(user: UserDto): void;
}

export default IUserService;
