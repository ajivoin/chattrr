import { ChatCommand } from "./chat";
import { ClearCommand } from "./clear";
import { SystemCommand } from "./system";
import { Command } from "./command";

const Commands: Map<string, Command> = new Map();
Commands.set(ChatCommand.data.name, ChatCommand);
Commands.set(ClearCommand.data.name, ClearCommand);
Commands.set(SystemCommand.data.name, SystemCommand);

export { Command, Commands };
