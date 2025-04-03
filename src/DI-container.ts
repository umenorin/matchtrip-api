import { container } from "tsyringe";
import UserRepository from "./repositories/UserRepository.js";
import IUserService from "./Interfaces/IUserService.js";
import UserService from "./services/UserService.js";
import { TravelRepository } from "./repositories/TravelRepository.js";
import ITravelSevice from "./Interfaces/ITravelService.js";
import { TravelService } from "./services/TravelService.js";

// Repositories
container.register("IUserRepository", {
  useClass: UserRepository,
});

container.register("ITravelRepository", {
  useClass: TravelRepository,
});

// Services
container.register<IUserService>("UserService", UserService);

container.register<ITravelSevice>("TravelService", TravelService);
export default container;
