import { injectable } from "tsyringe";
import MessageDto from "../DTO/MessageDto.js";
import { CustomError } from "../errors/CustomError.js";
import IMessageRepository from "../Interfaces/IMessageRepository.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

@injectable()
class MessageRepository implements IMessageRepository {
  async getById(id: string): Promise<MessageDto | null> {
    if (id.length == 0) {
      throw new CustomError("Message not Found", 400);
    }
    try {
      const message = await Message.findById(id).exec();
      if (!message) {
        throw new CustomError("Messsage not found", 400);
      }
      const messageDto = new MessageDto({
        id: id,
        owner: message.owner as typeof User,
        content: message.content as string,
        dateMessageSend: message.createdAt as Date,
      });
      return messageDto;
    } catch (error: any) {
      throw new CustomError(error.message, 400);
    }
  }
  async sendMessage(
    userId: string,
    messageDto: MessageDto
  ): Promise<MessageDto> {
    try {
      const user = await verifyUserExitAndReturn(userId);
      const newMessage = await Message.create({
        content: messageDto.content,
        owner: user,
      });
      if (!newMessage) {
        throw new CustomError("Message don't send", 400);
      }
      messageDto.owner = user;
      return messageDto;
    } catch (error: any) {
      throw new CustomError(error.message, 400);
    }
  }
  async deleteMessage(userId: string, id: string): Promise<boolean> {
    const user: any = await verifyUserExitAndReturn(userId);
    const message: any = await Message.findOne({ id: id });
    if (!message) {
      throw new CustomError("Message does't exist", 400);
    }
    console.log(user._id);
    console.log(message.owner._id);
    if (!user._id.equals(message.owner._id)) {
      throw new CustomError("This not your message", 401);
    }
    const messageDeleted: any = await Message.deleteOne(message);
    if (messageDeleted) {
      return true;
    }
    return false;
  }

  async updateMessage(userId: string, message: MessageDto): Promise<boolean> {
    try {
      const user:any = await verifyUserExitAndReturn(userId);

      const existingMessage:any = await Message.findOne({ _id: message.id });
      if (!existingMessage) {
        throw new CustomError("Message doesn't exist", 400);
      }

      if (!user._id.equals(existingMessage.owner._id)) {
        throw new CustomError("This is not your message", 401);
      }

      const updateResult = await Message.updateOne(
        { _id: existingMessage._id },
        { $set: { content: message.content } }
      );
      return updateResult.modifiedCount > 0;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Failed to update message", 500);
    }
  }
}
const verifyUserExitAndReturn = async (userId: string) => {
  if (userId.length == 0) {
    throw new CustomError("User not found", 400);
  }
  const user = await User.findById(userId).select("-password -Travels");
  if (!user) {
    throw new CustomError("User not found", 400);
  }
  return user;
};
export default MessageRepository;
