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
import { RatingRepository } from "./repositories/RatingRepository.js";
import { RatingService } from "./services/RatingService.js";
import { IRatingService } from "./Interfaces/IRatingService.js";
import { CategoryRepository } from "./repositories/CategoryRepository.js";
import { CategoryService } from "./services/CategoryService.js";
import { ICategoryService } from "./Interfaces/ICategoryService.js";
import IChatService from "./Interfaces/IChatService.js";
import { ChatService } from "./services/ChatService.js";
import { ChatRepository } from "./repositories/ChatRepository.js";
import IMatchService from "./Interfaces/IMatchService.js";
import { MatchService } from "./services/MatchService.js";
import { MatchRepository } from "./repositories/MatchRepository.js";
import { UploadService } from "./services/UploadService.js";
import { UploadController } from "./controllers/UploadController.js";

// Registro de Repositórios parabens mano
container.register("IUserRepository", {
  useClass: UserRepository,
});
container.register("ITravelRepository", {
  useClass: TravelRepository,
});
container.register("IMessageRepository", {
  useClass: MessageRepository,
});
container.register("IRatingRepository", {
  useClass: RatingRepository,
});
container.register("ICategoryRepository", {
  useClass: CategoryRepository,
});
container.register("IChatRepository", {
  useClass: ChatRepository,
});
container.register("IMatchRepository", {
  useClass: MatchRepository,
});

// Registro de Services ta voando em
container.register<IUserService>("IUserService", {
  useClass: UserService,
});

container.register<ITravelService>("ITravelService", {
  useClass: TravelService,
});

container.register<IMessageService>("IMessageService", {
  useClass: MessageService,
});

container.register<IRatingService>("IRatingService", {
  useClass: RatingService,
});

container.register<ICategoryService>("ICategoryService", {
  useClass: CategoryService,
});

container.register<IChatService>("IChatService", {
  useClass: ChatService,
});

container.register<IMatchService>("IMatchService", {
  useClass: MatchService,
});

container.register("UploadService", {
  useClass: UploadService
});

container.register("UploadController", {
  useClass: UploadController
});
export { container };
