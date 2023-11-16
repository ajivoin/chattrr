import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { openAIKey } from "../cfg/config";
import { Database } from "../data";

const configuration = new Configuration({
  apiKey: openAIKey,
});

const api = new OpenAIApi(configuration);

const chatGpt4_5 = async (message: string, guildId: string, channelId: string, userId: string): Promise<string> => {
  Database.addMessage("gpt-4.5", guildId, channelId, userId, "user", message);
  const res = await api.createChatCompletion({
    messages: Database.getRelevantMessages("gpt-4.5", guildId, channelId, userId).map(m => { return { role: m.role, content: m.content }; }) as ChatCompletionRequestMessage[],
    model: "gpt-4-1106-preview",
  });
  if (res.status != 200) {
    console.error(`OpenAI returned an error:`);
    console.error(res);
    return "";
  }
  const { content, role } = res.data.choices[0].message!;
  Database.addMessage("gpt-4.5", guildId, channelId, userId, role, content);
  return content;
};

const chatGpt3_5 = async (message: string, guildId: string, channelId: string, userId: string): Promise<string> => {
  Database.addMessage("gpt-3.5", guildId, channelId, userId, "user", message);
  const res = await api.createChatCompletion({
    messages: Database.getRelevantMessages("gpt-3.5", guildId, channelId, userId).map(m => { return { role: m.role, content: m.content }; }) as ChatCompletionRequestMessage[],
    model: "gpt-3.5-turbo-1106",
  });
  if (res.status != 200) {
    console.error(`OpenAI returned an error:`);
    console.error(res);
    return "";
  }
  const { content, role } = res.data.choices[0].message!;
  Database.addMessage("gpt-3.5", guildId, channelId, userId, role, content);
  return content;
};

const classicChat = async (message: string, guildId: string, channelId: string, userId: string): Promise<string> => {
  Database.addMessage("classic", guildId, channelId, userId, "user", message);
  const res = await api.createChatCompletion({
    model: "gpt-3.5-turbo-1106",
    messages: [{ role: "system", content: "You are to respond as if you were an early version of GPT-3." }] as ChatCompletionRequestMessage[],
  });
  if (res.status != 200) {
    console.error(`OpenAI returned an error:`);
    console.error(res);
    return "";
  }
  const { content, role } = res.data.choices[0].message!;
  Database.addMessage("classic", guildId, channelId, userId, role, content);
  return content;
};

export { chatGpt3_5, chatGpt4_5, classicChat };
