import { ActivityType, Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { token, guild } from './cfg/config';
import { Command, Commands, } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${ c.user.tag }`);

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
      await interaction.followUp({ content: 'There was an error while executing this command! Try your command again. If this persists, use `/clear`.', ephemeral: false });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command! Try your command again. If this persists, use `/clear`.', ephemeral: false });
    }
  }
});

client.login(token);
