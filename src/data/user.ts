import { Message } from "./message";

class User {
  public id: string;
  public systemMessage?: string;
  public messages: Message[];

  constructor(userId: string) {
    this.messages = [];
    this.id = userId;
  }

  public getMessages(): Message[] {
    const msgsCopy = this.messages.slice();
    if (this.systemMessage) {
      msgsCopy.unshift(new Message("system", this.systemMessage));
    }
    return msgsCopy;
  }
}

export { User };
