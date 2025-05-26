import IUserService from "../Interfaces/IUserService.js";
import { User } from "../models/User.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";
import IUserRepository from "../Interfaces/IUserRepository.js";
import { CustomError } from "../errors/CustomError.js";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { UserCategory } from "../models/UserCategory.js";
import CategoryDto from "../DTO/CategoryDto.js";

@injectable()
class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;

  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async createUser(user: UserDtoRequest): Promise<UserDtoResponse> {
    let verifyUserExist = false;

    if (user.email && user.uniqueIdentification) {
      verifyUserExist = await this._userRepository.findUserExist(
        user.email,
        user.uniqueIdentification,
      );
    }

    if (verifyUserExist) {
      throw new CustomError("Email or Unique Identification already used", 405);
    }

    const newUser = await this._userRepository.register(user);
    return newUser;
  }

  async login(user: UserDtoRequest): Promise<UserDtoResponse> {
    try {
      const _user = await User.findOne({ email: user.email });
      console.log(_user);

      if (!_user) {
        throw new Error("Credenciais inválidas user");
      }

      const isPasswordValid = bcrypt.compareSync(
        user.password,
        _user.password as string,
      );

      if (!isPasswordValid) {
        throw new CustomError("Credenciais inválidas senha", 400);
      }
      const categoriesDto: CategoryDto[] = [];
      const categories: any = await UserCategory.find({
        userId: _user._id,
      }).populate("categoryId");
      console.log(categories);
      categories.forEach((category: any) => {
        console.log(category.categoryId);
        categoriesDto.push(
          new CategoryDto({
            id: category.categoryId._id,
            name: category.categoryId.name,
          }),
        );
      });

      return new UserDtoResponse({
        id: _user.id as string,
        email: _user.email as string,
        name: _user.name as string,
        numberPhone: _user.numberPhone as string,
        uniqueIdentification: _user.uniqueIdentification as string,
        age: _user.age as number,
        nationality: _user.nationality as string,
        gender: _user.gender as string,
        profileImage: _user.profileImage,
        categories: categoriesDto,
      });
    } catch (error: any) {
      throw new CustomError(error.message, 401);
    }
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
    userData: UserDtoRequest,
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
    const categoriesDto: CategoryDto[] = [];
    const categories: any = await UserCategory.find({
      userId: _user._id,
    }).populate("categoryId");
    console.log(categories);
    categories.forEach((category: any) => {
      console.log(category.categoryId);
      categoriesDto.push(
        new CategoryDto({
          id: category.categoryId._id,
          name: category.categoryId.name,
        }),
      );
    });

    return new UserDtoResponse({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      numberPhone: updatedUser.numberPhone,
      uniqueIdentification: updatedUser.uniqueIdentification,
      age: updatedUser.age,
      nationality: updatedUser.nationality,
      gender: updatedUser.gender,
      profileImage: updatedUser.profileImage,
      categories: categoriesDto,
    });
  }

  async getUser(user: string): Promise<UserDtoResponse> {
    const _user: any = await User.findById(user);
    console.log(user);

    if (!user) {
      throw new Error("Credenciais inválidas user");
    }
    const categoriesDto: CategoryDto[] = [];
    const categories: any = await UserCategory.find({
      userId: _user._id,
    }).populate("categoryId");
    console.log(categories);
    categories.forEach((category: any) => {
      console.log(category.categoryId);
      categoriesDto.push(
        new CategoryDto({
          id: category.categoryId._id,
          name: category.categoryId.name,
        }),
      );
    });

    return new UserDtoResponse({
      id: _user._id as string,
      email: _user.email as string,
      name: _user.name as string,
      numberPhone: _user.numberPhone as string,
      uniqueIdentification: _user.uniqueIdentification as string,
      age: _user.age as number,
      nationality: _user.nationality as string,
      gender: _user.gender as string,
      profileImage: _user.profileImage,
      categories: categoriesDto,
    });
  }
}

export default UserService;
