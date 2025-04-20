import { injectable } from "tsyringe";
import MessageDto from "../DTO/MessageDto.js";
import UserDtoRequest from "../DTO/UserDtoRequest.js";
import { CustomError } from "../errors/CustomError.js";
import IMessageRepository from "../Interfaces/IMessageRepository.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

@injectable()
class MessageRepository implements IMessageRepository {
  getById(id: string): Promise<MessageDto | null> {
    // const message = Message.findById(id);
    // if (!message) {
    //   throw new CustomError("Messsage not found", 400);
    // }
    // const messageDto = new MessageDto({ id: message._id, owner:message.owner});
    // return message;
    throw new Error("Method not implemented.");
  }
  async sendMessage(
    userId: string,
    messageDto: MessageDto
  ): Promise<MessageDto> {
    const user = await User.findById(userId).select("-password -Travels");
    if (!user) {
      throw new CustomError("User not found", 400);
    }

    const newMessage = await Message.create({
      content: messageDto.content,
      owner: user,
    });
    if (!newMessage) {
      throw new CustomError("Message don't send", 400);
    }
    messageDto.owner = user;
    return messageDto;
  }
  deleteMessage(userId: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
  updateMessage(userId: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export default MessageRepository;
