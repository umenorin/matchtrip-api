import MessageDto from "../DTO/MessageDto.js";

interface IMessageRepository {
  //This method will return a Message by your Id
  getById(id: string): Promise<MessageDto | null>;

  // this method will create a message
  sendMessage(userId: string,chatId:string ,messageDto: MessageDto): Promise<MessageDto>;

  deleteMessage(userId: string, id: string): Promise<boolean>;

  updateMessage(userId: string, message: MessageDto): Promise<boolean>;
}

export default IMessageRepository;
