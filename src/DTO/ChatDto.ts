import MessageDto from "./MessageDto.js";

class ChatDto {
  id?: string;
  messages: MessageDto[];

  constructor({
    id,
    messages,
  }: {
    id?: string;
    messages: MessageDto[];
  }) {
    this.id = id;
    this.messages = messages;
  }
}

export default ChatDto;
