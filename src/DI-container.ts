import { container } from "tsyringe";
import UserRepository from "./repositories/UserRepository.js";
import IUserService from "./Interfaces/IUserService.js";
import UserService from "./services/UserService.js";
import { TravelRepository } from "./repositories/TravelRepository.js";
import ITravelService from "./Interfaces/ITravelService.js";
import { TravelService } from "./services/TravelService.js";
import MessageRepository from "./repositories/MessageRepository.js";
import MessageService from "./services/MessageService.js";
import IMessageService from "./Interfaces/IMessageService.js";

// Registro de Repositórios parabens mano
container.register("IUserRepository", {
  useClass: UserRepository
});

container.register("ITravelRepository", {
  useClass: TravelRepository
});
container.register("IMessageRepository",{
  useClass: MessageRepository
})

// Registro de Services ta voando em
container.register<IUserService>("IUserService", {
  useClass: UserService
});

container.register<ITravelService>("ITravelService", {
  useClass: TravelService
});

container.register<IMessageService>("IMessageService", {
  useClass: MessageService
});
export { container };
