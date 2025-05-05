import MessageDto from "./MessageDto.js";

class ChatDto {
  id?: string;
  messages: MessageDto[];
  travelId: string;

  constructor({
    id,
    messages,
    travelId,
  }: {
    id?: string;
    messages: MessageDto[];
    travelId: string;
  }) {
    this.id = id;
    this.messages = messages;
    this.travelId = travelId;
  }
}

export default ChatDto;
