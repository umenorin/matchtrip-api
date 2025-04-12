import UserDto from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";

interface IUserRepository {
  //This method will return a user by your Id
  getById(id: string): Promise<UserDtoResponse | null>;
  //This method will return a user by your Email
  getByEmail(email: string): Promise<UserDtoResponse | null>;
  //This method will return a user by your Unique Identificator
  getByUniqueIdentificator(uniqueIdentificator: string): UserDto;
  //this method will create a new user and set in database and when the create has sucessfuly this method return the user ID
  register(user: UserDto): void;
  update(id: string, user:UserDto) : Promise<UserDtoResponse | null>;
  delete(id: string): void;
  

  findUserExist(email: string, password: string): Promise<boolean>;
}

export default IUserRepository;
