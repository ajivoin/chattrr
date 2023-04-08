import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption } from "discord.js";
import { Database } from "../data";
import { Command } from "./command";
import { personalityMap } from "../prompts";

const PersonalityCommand = new Command(
  new SlashCommandBuilder()
    .setName("personality")
    .setDescription("Set a personality for your instance of the bot.")
    .addStringOption(new SlashCommandStringOption()
      .setDescription("Message instructing all future prompts.")
      .setRequired(true)
      .setName("name")
      .setAutocomplete(true))
  ,
  async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: false });

    const userMessage: string = interaction.options.get("name", true).value as string;

    if (!personalityMap.has(userMessage)) await interaction.followUp("Invalid option.");

    const guildId = interaction.guildId!;
    const channelId = interaction.channelId;
    const userId = interaction.user.id;
    Database.addSystemMessage(guildId, channelId, userId, personalityMap.get(userMessage)!.value);
    interaction.followUp("Personality selected. Use `/clear` to reset your conversation.");
  }
);

export { PersonalityCommand };
