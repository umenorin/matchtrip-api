import IUserRepository from "../Interfaces/IUserRepository.js";
import { User } from "../models/User.js";
import UserDto from "../DTO/UserDtoRequest.js";
import bcrypt from "bcryptjs";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import UserDtoResponse from "../DTO/UserDtoResponse.js";
import { injectable } from "tsyringe";

@injectable()
class UserRepository implements IUserRepository{
    async findUserExist(email: string, uniqueIdentification: string): Promise<boolean> {
        const userEmail = await User.findOne({email:email})
        const userUniqueIdentification = await User.findOne({uniqueIdentification:uniqueIdentification})

        if(userEmail || userUniqueIdentification){
            return true;
        }
        return false;

    }

    async register(user: UserDtoRequest): Promise<void> {
        const hash = process.env.HASH_SALT_BCRYPT ? Number(process.env.HASH_SALT_BCRYPT) : 10; 
        const hashPassword = await bcrypt.hash(user.password,hash)
        console.log("hashPassword: ",hashPassword)
        await User.create({
            name: user.name,
            password: hashPassword,
            email: user.email,
            numberPhone: user.numberPhone,
            age: user.age,
            uniqueIdentification: user.uniqueIdentification,
        });
    }

    async getById(id: string): Promise<UserDtoResponse | null> {
        const user = await User.findOne({ _id: id }).exec();
    
        if (user) {
            const userDtoResponse: UserDtoResponse = {
                id:id,
                email: user.email as string,
                name: user.name as string,
                numberPhone: user.numberPhone as string,
                age: user.age as number,
                uniqueIdentification: user.uniqueIdentification as string,
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
}

export default UserRepository;
