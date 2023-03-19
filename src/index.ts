import { ActivityType, Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { token, guild } from './cfg/config';
import { Command, Commands, } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${ c.user.tag }`);
  const rest = new REST({ version: "10" }).setToken(token);
  const commandArray = [...Commands.values()].map(c => c.data.toJSON());
  rest.put(
    Routes.applicationGuildCommands(client.user!.id, guild),
    { body: commandArray }
  );

  client.user!.setActivity("/chat | /clear", { type: ActivityType.Listening });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command: Command = Commands.get(interaction.commandName)!;
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
