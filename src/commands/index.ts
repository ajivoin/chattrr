import { chatCommand } from "./chat";
import { ClearCommand } from "./clear";
import { SystemCommand } from "./system";
import { Command } from "./command";
import { PersonalityCommand } from "./personality";

const Commands: Map<string, Command> = new Map();
Commands.set(chatCommand.data.name, chatCommand);
Commands.set(ClearCommand.data.name, ClearCommand);
Commands.set(SystemCommand.data.name, SystemCommand);
Commands.set(PersonalityCommand.data.name, PersonalityCommand);

export { Command, Commands };
