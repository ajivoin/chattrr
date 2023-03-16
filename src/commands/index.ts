import { ChatCommand } from "./chat";
import { ClearCommand } from "./clear";
import { Command } from "./command";

const Commands: Map<string, Command> = new Map();
Commands.set(ChatCommand.data.name, ChatCommand);
Commands.set(ClearCommand.data.name, ClearCommand);

export { Commands };
