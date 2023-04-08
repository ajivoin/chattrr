import { ActivityType, AutocompleteInteraction, Client, Events, GatewayIntentBits } from 'discord.js';
import { token } from './cfg/config';
import { Command, Commands, } from './commands';
import { personalityMap } from './prompts';
import Fuse from 'fuse.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const fuse = new Fuse(Array.from(personalityMap.keys()));

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${ c.user.tag }`);

  client.user!.setActivity("/chat | /clear", { type: ActivityType.Listening });
});

const handleAutocomplete = async (interaction: AutocompleteInteraction) => {
  if (interaction.commandName === "personality") {
    const focusedValue = interaction.options.getFocused();
    // const choices = personalityMap.keys();
    const filtered = fuse.search(focusedValue);
    const filteredAsString = filtered.map(choice => choice.item);
    await interaction.respond(
      filteredAsString.map(choice => ({ name: choice, value: choice })).slice(0, 25)
    );
  }
};

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isAutocomplete()) {
    await handleAutocomplete(interaction);
    return;
  }
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
