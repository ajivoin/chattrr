import { SlashCommandBuilder } from "discord.js";

class Command {
  public data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  public execute: Function;
  constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute: Function) {
    this.data = data;
    this.execute = execute;
  }
}

export { Command };
