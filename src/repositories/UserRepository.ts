import IUserRepository from "../Interfaces/IUserRepository.js";
import { User } from "../models/User.js";
import UserDto from "../DTO/UserDtoRequest.js";
import bcrypt from "bcryptjs";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";
import { injectable } from "tsyringe";
import { Types } from "mongoose";
import { Category } from "../models/Categorie.js";
import { UserCategory } from "../models/UserCategory.js";

@injectable()
class UserRepository implements IUserRepository {
  async findUserExist(
    email: string,
    uniqueIdentification: string,
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

  async register(user: UserDtoRequest): Promise<UserDtoResponse> {
    const hash = process.env.HASH_SALT_BCRYPT
      ? Number(process.env.HASH_SALT_BCRYPT)
      : 10;
    const hashPassword = await bcrypt.hash(user.password, hash);
    


    const newUser = await User.create({
      name: user.name,
      password: hashPassword,
      email: user.email,
      numberPhone: user.numberPhone,
      age: user.age,
      uniqueIdentification: user.uniqueIdentification,
      nationality: user.nationality,
      gender: user.gender,
      profileImage: `/uploads/users/${user.profileImage}`,
    });
    const userDtoResponse: any = new UserDtoResponse({
      id: newUser._id as string,
      name: newUser.name as string,
      email: newUser.email as string,
      numberPhone: newUser.numberPhone as string,
      uniqueIdentification: newUser.uniqueIdentification as string,
      age: newUser.age as number,
      nationality: newUser.nationality as string,
      gender: newUser.gender as string,
      profileImage: newUser.profileImage,
      categories: [],
      travels: []
    });
    return userDtoResponse;
  }

  async getById(id: string): Promise<UserDtoResponse | null> {
    const user = await User.findOne({ _id: id }).exec();
    const categoriesId = await UserCategory.find({userId: id})
    console.log("categories ID: ",categoriesId)
    if (user) {
      const userDtoResponse: UserDtoResponse = {
        id: id,
        name: user.name as string,
        email: user.email as string,
        numberPhone: user.numberPhone as string,
        uniqueIdentification: user.uniqueIdentification as string,
        age: user.age as number,
        nationality: user.nationality as string,
        gender: user.gender as string,
        profileImage: user.profileImage,
      };
      return userDtoResponse;
    }

    return null;
  }

  async getByEmail(email: string): Promise<UserDtoResponse | null> {
    return User.findOne({ email });
  }

  getByUniqueIdentificator(uniqueIdentificator: string): UserDto {
    throw new Error("Method not implemented.");
  }

  async update(
    id: string,
    userData: Partial<UserDtoRequest>,
  ): Promise<UserDtoResponse> {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new Error("User not found for update");
    }

    return {
      id: updatedUser.id as string,
      name: updatedUser.name as string,
      email: updatedUser.email as string,
      numberPhone: updatedUser.numberPhone as string,
      uniqueIdentification: updatedUser.uniqueIdentification as string,
      age: updatedUser.age as number,
      nationality: updatedUser.nationality as string,
      gender: updatedUser.gender as string,
      profileImage: updatedUser.profileImage,
    };
  }

  async delete(id: string): Promise<void> {
    // Validação do ID
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID de usuário inválido");
    }

    // Operação de deleção
    const deletedUser = await User.findByIdAndDelete(id);

    // Verificação corrigida
    if (!deletedUser) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
  }
}

export default UserRepository;
