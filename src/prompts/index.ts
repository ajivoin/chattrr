import { prompts } from "./prompts";

export const personalityMap = new Map<string, Prompt>();
const promptsArray = prompts as Prompt[];
export type Prompt = {
  name: string;
  value: string;
};

prompts.forEach(prompt => {
  if (prompt.name.indexOf("`") !== -1) return;
  personalityMap.set(prompt.name, prompt);
});

export { promptsArray as prompts };
