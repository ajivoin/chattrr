import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { chat } from "../openai";
import { Command } from "./command";

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, size);
  }

  return chunks;
}

const ChatCommand = new Command(
  new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat with ChatGPT.")
    .addStringOption(new SlashCommandStringOption()
      .setDescription("Message for ChatGPT.")
      .setMinLength(3)
      .setRequired(true)
      .setName("prompt")),
  async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: false });

    const userMessage: string = interaction.options.get("prompt", true).value as string;
    const guildId = interaction.guildId!;
    const channelId = interaction.channelId;
    const userId = interaction.user.id;
    const responseMessage = await chat(userMessage, guildId, channelId, userId);
    const discordMessage = `> ${ userMessage }\n${ responseMessage }`;
    const chunks = chunkSubstr(discordMessage, 1900);
    chunks.forEach(async chunk => {
      if (chunk != "") {
        await interaction.followUp({ content: chunk, ephemeral: false });
      }
    });
  }
);

export { ChatCommand };
