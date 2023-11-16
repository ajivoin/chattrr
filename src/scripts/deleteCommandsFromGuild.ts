import { REST, Routes } from 'discord.js';
import { clientId, guilds, token } from '../../bot.json';
import { Commands } from '../commands';


// Grab the SlashCommandBuilder#toJSON() output of each command's data for deletion
const rest = new REST({ version: "10" }).setToken(token);
const commands = [...Commands.values()].map(c => c.data.toJSON());

const deleteCommands = async () => {
  try {
    console.log(`Started refreshing ${ commands.length } application (/) commands.`);
    const data: any[] = [];
    // The put method is used to delete all commands in the guild with the current set
    guilds.forEach(async (guild: string) => {
      console.log(`Deleting from ${ guild }.`);
      data.push(await rest.put(
        Routes.applicationGuildCommands(clientId, guild),
        { body: [] },
      ));
    });

    console.log(`Successfully reloaded ${ data[0]?.length } application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
// and delete your commands!
deleteCommands();
