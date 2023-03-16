import { Channel } from "./channel";

class Guild {
  id: string;
  private channels: Map<string, Channel>;

  constructor(guildId: string) {
    this.id = guildId;
    this.channels = new Map();
  }

  getChannel(channelId: string): Channel {
    if (this.channels.has(channelId)) {
      return this.channels.get(channelId)!;
    }
    const channel = new Channel(channelId);
    this.channels.set(channelId, channel);
    return channel;
  }
}

export { Guild };
