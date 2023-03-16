import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { Database } from "../data";
import { Command } from "./command";

const ClearCommand = new Command(
  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears your conversation history."),
  async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    Database.clearMessagesForUser(interaction.guildId!, interaction.channelId, interaction.user.id);
    await interaction.followUp("Your conversation history is cleared. ChatGPT has no clue who you are anymore.");
  }
);

export { ClearCommand };
