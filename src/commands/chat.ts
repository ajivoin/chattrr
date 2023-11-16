import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { chatGpt3_5, chatGpt4_5, classicChat } from "../openai";
import { Command } from "./command";

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, size);
  }

  return chunks;
}

const ChatGptCommand3_5 = new Command(
  new SlashCommandBuilder()
    .setName("chat3")
    .setDescription("Chat with ChatGPT. Uses GPT-3.5.")
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
    const responseMessage = await chatGpt3_5(userMessage, guildId, channelId, userId);
    const discordMessage = `> ${ userMessage }\n${ responseMessage }`;
    const chunks = chunkSubstr(discordMessage, 1900);
    chunks.forEach(async (chunk, i) => {
      if (chunk != "") {
        if (i > 0) await new Promise(r => setTimeout(r, 1 / 2 * 1000));
        await interaction.followUp({ content: chunk, ephemeral: false });
      }
    });
  }
);

const ChatGptCommand4_5 = new Command(
  new SlashCommandBuilder()
    .setName("chat4")
    .setDescription("Chat with ChatGPT. Uses GPT-4.5.")
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
    const responseMessage = await chatGpt4_5(userMessage, guildId, channelId, userId);
    const discordMessage = `> ${ userMessage }\n${ responseMessage }`;
    const chunks = chunkSubstr(discordMessage, 1900);
    chunks.forEach(async (chunk, i) => {
      if (chunk != "") {
        if (i > 0) await new Promise(r => setTimeout(r, 1 / 2 * 1000));
        await interaction.followUp({ content: chunk, ephemeral: false });
      }
    });
  }
);

const ClassicChatCommand = new Command(
  new SlashCommandBuilder()
    .setName("classic")
    .setDescription("Chat with ChatGPT. Uses GPT-3 with no context.")
    .addStringOption(new SlashCommandStringOption()
      .setDescription("Message for ChatGPT.")
      .setMinLength(3)
      .setRequired(true)
      .setName("prompt")),
  async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: false });

    const userMessage: string = interaction.options.get("prompt", true).value as string;
    const responseMessage = await classicChat(userMessage);
    const discordMessage = `> ${ userMessage }\n${ responseMessage }`;
    const chunks = chunkSubstr(discordMessage, 1900);
    chunks.forEach(async (chunk, i) => {
      if (chunk != "") {
        if (i > 0) await new Promise(r => setTimeout(r, 1 / 2 * 1000));
        await interaction.followUp({ content: chunk, ephemeral: false });
      }
    });
  }
);

export { ClassicChatCommand, ChatGptCommand3_5, ChatGptCommand4_5 };
