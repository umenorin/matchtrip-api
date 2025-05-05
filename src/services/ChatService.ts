import { inject, injectable } from "tsyringe";
import IChatService from "../Interfaces/IChatService.js";
import ChatDto from "../DTO/ChatDto.js";
import IChatRepository from "../Interfaces/IChatRepository.js";

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject("IChatRepository") private _chatRepository: IChatRepository
  ) {}
    getchat(id: string): Promise<ChatDto | null> {
        return this._chatRepository.getById(id)
    }

 
}
