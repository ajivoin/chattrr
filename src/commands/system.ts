import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { Database } from "../data";
import { Command } from "./command";

const SystemCommand = new Command(
  new SlashCommandBuilder()
    .setName("initialize")
    .setDescription("Add a directive to your instance of the chat bot.")
    .addStringOption(new SlashCommandStringOption()
      .setDescription("Message instructing all future prompts.")
      .setMinLength(3)
      .setRequired(true)
      .setName("prompt")),
  async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: false });

    const userMessage: string = interaction.options.get("prompt", true).value as string;
    const guildId = interaction.guildId!;
    const channelId = interaction.channelId;
    const userId = interaction.user.id;
    Database.addSystemMessage(guildId, channelId, userId, userMessage);
    interaction.followUp("System message added. Use `/clear` to reset your conversation.");
  }
);

export { SystemCommand };
