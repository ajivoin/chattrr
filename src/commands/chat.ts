import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { chat4 } from "../openai";
import { Command } from "./command";

function chunkSubstr(str: string, size: number): string[] {
  // const numChunks = Math.ceil(str.length / size);
  // const chunks = [];

  // for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
  //   chunks.push(str.substring(o, size));
  // }

  // return chunks;
  return str.match(new RegExp(`(.|[\r\n]){1,${ size }}`, "g")) || [];
}

const chatCommand = new Command(
  new SlashCommandBuilder()
    .setName("chat")
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
    const responseMessage = await chat4(userMessage, guildId, channelId, userId);
    console.log(responseMessage);
    const quotedSegment = `> ${ userMessage }\n`;
    const discordMessage = `${ quotedSegment }${ responseMessage }`;
    const chunks = chunkSubstr(discordMessage, 2000);
    console.log(chunks.map(c => c.substring(0, 16)).join("..., "));
    chunks.forEach(async (chunk, i) => {
      if (chunk != "") {
        if (i > 0) await new Promise(r => setTimeout(r, 1 / 2 * 1000));
        await interaction.followUp({ content: chunk, ephemeral: false });
      }
    });
  }
);


export { chatCommand };
