import { Channel } from "./channel";
import { Guild } from "./guild";
import { Message } from "./message";
import { User } from "./user";

class Data {
  private guilds: Map<string, Guild>;
  constructor() {
    this.guilds = new Map();
  }

  private getUser(guildId: string, channelId: string, userId: string): User {
    return this.getGuild(guildId).getChannel(channelId).getUser(userId);
  }

  public clearMessagesForUser(guildId: string, channelId: string, userId: string): void {
    this.getUser(guildId, channelId, userId).messages = [];
  }

  public clearSystemMessageForUser(guildId: string, channelId: string, userId: string): void {
    this.getUser(guildId, channelId, userId).systemMessage = undefined;
  }

  public getGuild(guildId: string): Guild {
    if (this.guilds.has(guildId)) {
      return this.guilds.get(guildId)!;
    }
    const guild = new Guild(guildId);
    this.guilds.set(guildId, guild);
    return guild;
  }
  /**
   * getRelevantMessages
   */
  public getRelevantMessages(guildId: string, channelId: string, userId: string): Message[] {
    if (!this.guilds.has(guildId)) {
      this.guilds.set(guildId, new Guild(guildId));
    }
    return this.getUser(guildId, channelId, userId).getMessages();
  }

  public addMessage(guildId: string, channelId: string, userId: string, role: string, message: string): void {
    const user = this.getUser(guildId, channelId, userId);
    user.messages.push(new Message(role, message));
  };

  public addSystemMessage(guildId: string, channelId: string, userId: string, message: string): void {
    const user = this.getUser(guildId, channelId, userId);
    user.systemMessage = message;
  }
}

const Database = new Data();

export { Database, Guild, Channel, User };
