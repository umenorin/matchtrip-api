import ChatDto from "../DTO/ChatDto.js";

interface IChatRepository {
  getById(id: string): Promise<ChatDto | null>;
}

export default IChatRepository;
