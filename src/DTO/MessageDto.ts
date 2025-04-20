class MessageDto {
    id?:string;
    content:string;
    owner: any;
    dateMessageSend: Date;

    constructor({
        id,
        content,
        dateMessageSend,
        
      }: {
        id?: string;
        content: string;
        dateMessageSend: Date;
      }) {
        this.id = id;
        this.content = content;
        this.dateMessageSend = dateMessageSend;
      }

}

export default MessageDto