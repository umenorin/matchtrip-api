import IUserService from "../Interfaces/IUserService.js";
import { User } from "../models/User.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";
import IUserRepository from "../Interfaces/IUserRepository.js";
import { CustomError } from "../errors/CustomError.js";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";

@injectable()
class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;

  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
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

  async login(user: UserDtoRequest): Promise<UserDtoResponse> {
    const _user = await User.findOne({ email: user.email });
    console.log(_user);

    if (!_user) {
      throw new Error("Credenciais inválidas user");
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      _user.password as string
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas senha");
    }

    return new UserDtoResponse({
      id: _user.id as string,
      email: _user.email as string,
      name: _user.name as string,
      numberPhone: _user.numberPhone as string,
      uniqueIdentification: _user.uniqueIdentification as string,
      age: _user.age as number,
      nationality: _user.nationality as string,
      gender: _user.gender as string,
    });
  }

  deleteUser(id: string): void {
    try {
      this._userRepository.delete(id);
    } catch (error) {
      throw new CustomError("Internal Server Error", 500);
    }
  }

  async editUser(
    id: string,
    userData: UserDtoRequest
  ): Promise<UserDtoResponse> {
    const existingUser = await this._userRepository.getById(id);
    if (!existingUser) throw new CustomError("User not Found", 404);

    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this._userRepository.getByEmail(userData.email);
      if (emailExists) throw new CustomError("Email already exists", 400);
    }

    if (userData.password) {
      userData.password = bcrypt.hashSync(userData.password, 10);
    }

    const updatedUser = await this._userRepository.update(id, userData);
    if (!updatedUser) throw new CustomError("Internal Server Error", 500);

    return new UserDtoResponse({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      numberPhone: updatedUser.numberPhone,
      uniqueIdentification: updatedUser.uniqueIdentification,
      age: updatedUser.age,
      nationality: updatedUser.nationality,
      gender: updatedUser.gender,
    });
  }

  async getUser(user: UserDtoRequest): Promise<UserDtoResponse> {
    const _user = await User.findOne({ email: user.email });
    console.log(_user);

    if (!_user) {
      throw new Error("Credenciais inválidas user");
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      _user.password as string
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas senha");
    }

    return new UserDtoResponse({
      id: _user.id as string,
      email: _user.email as string,
      name: _user.name as string,
      numberPhone: _user.numberPhone as string,
      uniqueIdentification: _user.uniqueIdentification as string,
      age: _user.age as number,
      nationality: _user.nationality as string,
      gender: _user.gender as string,
    });
  }
}

export default UserService;
