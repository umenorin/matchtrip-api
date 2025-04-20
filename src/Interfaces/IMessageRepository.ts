import MessageDto from "../DTO/MessageDto.js";

interface IMessageRepository {
  //This method will return a Message by your Id
  getById(id: string): Promise<MessageDto | null>;

  // this method will create a message
  sendMessage(userId: string, messageDto: MessageDto): void;

  deleteMessage(userId: string, id: string): boolean;

  updateMessage(userId: string, id: string): boolean;
}

export default IMessageRepository;
