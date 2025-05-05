import ChatDto from "../DTO/ChatDto.js";

interface IChatService {
  getchat(id: string): Promise<ChatDto | null>;
}

export default IChatService;
