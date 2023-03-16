import { Message } from "./message";

class User {
  public id: string;
  public messages: Message[];

  constructor(userId: string) {
    this.messages = [];
    this.id = userId;
  }
}

export { User };
