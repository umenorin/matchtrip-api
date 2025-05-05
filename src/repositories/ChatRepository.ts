import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IChatRepository from "../Interfaces/IChatRepository.js";
import ChatDto from "../DTO/ChatDto.js";
import { Chat } from "../models/Chat.js";
import MessageDto from "../DTO/MessageDto.js";

@injectable()
export class ChatRepository implements IChatRepository {
    async getById(id: string): Promise<ChatDto | null> {
        const chat:any = await verifyChatExitAndReturn(id)
        const chatDto:any = new ChatDto({
            id:chat._id as string,
            messages:chat.messages as MessageDto[]
        })
        return chatDto
    }

    
}

const verifyChatExitAndReturn = async (chatId: string) => {
  if (!chatId || chatId.length === 0) {
    throw new CustomError("Chat ID is required", 400);
  }

 const chat = await Chat.findById(chatId)
   .populate({
     path: "messages",
     select: "content createdAt owner", // Inclui owner nos campos selecionados
     options: { sort: { createdAt: -1 } },
     populate: {
       // Popula o owner dentro de cada mensagem
       path: "owner",
       select: "name", // Traz apenas o nome do usuário
       model: "User", // Opcional (mongoose geralmente infere pelo ref)
     },
   })
   .exec();

  if (!chat) {
    throw new CustomError("Chat not found", 404); // 404 é mais apropriado para "não encontrado"
  }

  return chat;
};