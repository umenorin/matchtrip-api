import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IChatRepository from "../Interfaces/IChatRepository.js";
import ChatDto from "../DTO/ChatDto.js";

@injectable()
export class ChatRepository implements IChatRepository {
    getById(id: string): Promise<ChatDto | null> {
        throw new Error("Method not implemented.");
    }
}
