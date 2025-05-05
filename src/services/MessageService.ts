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

  async getById(id: string): Promise<MessageDto | null> {
    const messageGetted = await this._messageRepository.getById(id)
    return messageGetted
  }

  async sendMessage(userId: string,chatId:string ,messageDto: MessageDto): Promise<MessageDto> {
    const newMessage = await this._messageRepository.sendMessage(userId,chatId,messageDto)

    return newMessage;
  }
  async deleteMessage(userId: string, id: string): Promise<boolean> {
    const isMessageDeleted = await this._messageRepository.deleteMessage(userId,id)
    if(isMessageDeleted){
      return true
    }
    return false
  }
  
  async updateMessage(userId: string, message: MessageDto): Promise<boolean> {
   const isMessageDeleted = await this._messageRepository.updateMessage(
     userId,
     message
   );
   if (isMessageDeleted) {
     return true;
   }
   return false;
  }
}

export default MessageService