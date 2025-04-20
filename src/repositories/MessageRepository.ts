import MessageDto from "../DTO/MessageDto.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import IMessageRepository from "../Interfaces/IMessageRepository.js";

class MessageRepository implements IMessageRepository {
    getById(id: string): Promise<MessageDto | null> {
        throw new Error("Method not implemented.");
    }
    sendMessage(userId: string): void {
        throw new Error("Method not implemented.");
    }
    deleteMessage(userId: string, id: string): boolean {
        throw new Error("Method not implemented.");
    }
    updateMessage(userId: string, id: string): boolean {
        throw new Error("Method not implemented.");
    }

}