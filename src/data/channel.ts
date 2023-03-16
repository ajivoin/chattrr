import { User } from "./user";

class Channel {
  id: string;
  users: Map<string, User>;

  constructor(channelId: string) {
    this.id = channelId;
    this.users = new Map();
  }

  getUser(userId: string): User {
    if (this.users.has(userId)) {
      return this.users.get(userId)!;
    }
    const user = new User(userId);
    this.users.set(userId, user);
    return user;
  }

}

export { Channel };
