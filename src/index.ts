import { ActivityType, Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { token } from './cfg/config';
import { Commands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${ c.user.tag }`);
  const rest = new REST({ version: "10" }).setToken(token);
  const commandArray = [...Commands.values()].map(c => c.data.toJSON());
  rest.put(
    Routes.applicationGuildCommands(client.user!.id, "634472861872029717"),
    { body: commandArray }
  );

  client.user!.setActivity("/chat | /clear", { type: ActivityType.Listening });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command: { data: SlashCommandBuilder, execute: Function; } = Commands.get(interaction.commandName) as { data: SlashCommandBuilder, execute: Function; };
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(token);
