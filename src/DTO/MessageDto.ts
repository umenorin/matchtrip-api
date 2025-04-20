import { User } from "../models/User.js";

class MessageDto {
    id?:string;
    content:string;
    owner?: any;
    dateMessageSend: Date;

    constructor({
        id,
        content,
        dateMessageSend,
        owner
        
      }: {
        id?: string;
        content: string;
        dateMessageSend: Date;
        owner: typeof User
      }) {
        this.id = id;
        this.content = content;
        this.dateMessageSend = dateMessageSend;
        this.owner = owner;
      }

}

export default MessageDto