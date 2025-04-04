import { container } from "tsyringe";
import UserRepository from "./repositories/UserRepository.js";
import IUserService from "./Interfaces/IUserService.js";
import UserService from "./services/UserService.js";
import { TravelRepository } from "./repositories/TravelRepository.js";
import ITravelService from "./Interfaces/ITravelService.js";
import { TravelService } from "./services/TravelService.js";


// Registro de Repositórios
container.register("IUserRepository", {
  useClass: UserRepository
});

container.register("ITravelRepository", {
  useClass: TravelRepository
});

// Registro de Services
container.register<IUserService>("IUserService", {
  useClass: UserService
});

container.register<ITravelService>("ITravelService", {
  useClass: TravelService
});

export { container };
