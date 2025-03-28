import { container } from "tsyringe";
import IUserRepository from "../Interfaces/IUserRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import IUserService from "../Interfaces/IUserService.js";
import UserService from "../services/UserService.js";


container.register("IUserRepository", {
    useClass: UserRepository,
  });
container.register<IUserService>("UserService",UserService)

export default container;