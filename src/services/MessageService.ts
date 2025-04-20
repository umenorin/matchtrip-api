import { inject, injectable } from "tsyringe";
import MessageDto from "../DTO/MessageDto.js";
import IMessageService from "../Interfaces/IMessageService.js";
import IMessageRepository from "../Interfaces/IMessageRepository.js";


@injectable()
class MessageService implements IMessageService {
  private readonly _messageRepository: IMessageRepository;

  constructor(
    @inject("IMessageRepository") messageRepository: IMessageRepository
  ) {
    this._messageRepository = messageRepository;
  }

  getById(id: string): Promise<MessageDto | null> {
    throw new Error("Method not implemented.");
  }
  sendMessage(userId: string, messageDto: MessageDto): Promise<MessageDto> {
    const newMessage = this._messageRepository.sendMessage(userId,messageDto)

    return newMessage;
  }
  deleteMessage(userId: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
  updateMessage(userId: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export default MessageService