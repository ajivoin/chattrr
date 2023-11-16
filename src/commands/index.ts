import { ChatGptCommand3_5, ChatGptCommand4_5, ClassicChatCommand } from "./chat";
import { ClearCommand } from "./clear";
import { SystemCommand } from "./system";
import { Command } from "./command";
import { PersonalityCommand } from "./personality";

const Commands: Map<string, Command> = new Map();
Commands.set(ChatGptCommand3_5.data.name, ChatGptCommand3_5);
Commands.set(ChatGptCommand4_5.data.name, ChatGptCommand4_5);
Commands.set(ClassicChatCommand.data.name, ClassicChatCommand);
Commands.set(ClearCommand.data.name, ClearCommand);
Commands.set(SystemCommand.data.name, SystemCommand);
Commands.set(PersonalityCommand.data.name, PersonalityCommand);

export { Command, Commands };
