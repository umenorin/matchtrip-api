import IUserRepository from "../Interfaces/IUserRepository.js";
import { User } from "../models/User.js";
import UserDto from "../DTO/UserDtoRequest.js";

class UserRepository implements IUserRepository {
  async findUserExist(
    email: string,
    uniqueIdentification: string
  ): Promise<boolean> {
    const userEmail = await User.findOne({ email: email });
    const userUniqueIdentification = await User.findOne({
      uniqueIdentification: uniqueIdentification,
    });

    if (userEmail || userUniqueIdentification) {
      return true;
    }
    return false;
  }

  async register(user: UserDto): Promise<void> {
    await User.create({
      name: user.name,
      password: user.password,
      email: user.email,
      numberPhone: user.numberPhone,
      age: user.age,
      uniqueIdentification: user.uniqueIdentification,
    });
    const newUser = User.findOne({ email: user.email }).exec();
    console.log(newUser);
  }

  getById(id: string): UserDto | null {
    throw new Error("Method not implemented.");
  }

  getByEmail(email: string): UserDto {
    throw new Error("Method not implemented.");
  }
  getByUniqueIdentificator(uniqueIdentificator: string): UserDto {
    throw new Error("Method not implemented.");
  }
}

export default UserRepository;
