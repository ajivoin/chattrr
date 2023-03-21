import { REST, Routes } from 'discord.js';
import { clientId, guild, token } from '../../bot.json';
import { Commands } from '../commands';


// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
const rest = new REST({ version: "10" }).setToken(token);
const commands = [...Commands.values()].map(c => c.data.toJSON());

const deploy = async () => {
  try {
    console.log(`Started refreshing ${ commands.length } application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(clientId, guild),
      { body: [] },
    );

    console.log(`Successfully reloaded ${ data.length } application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
// and deploy your commands!
deploy();
