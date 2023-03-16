import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { openAIKey } from "../cfg/config";
import { Database } from "../data";

const configuration = new Configuration({
  apiKey: openAIKey,
});

const api = new OpenAIApi(configuration);

const chat = async (message: string, guildId: string, channelId: string, userId: string): Promise<string> => {
  Database.addMessage(guildId, channelId, userId, "user", message);
  const res = await api.createChatCompletion({
    messages: Database.getRelevantMessages(guildId, channelId, userId).map(m => { return { role: m.role, content: m.content }; }) as ChatCompletionRequestMessage[],
    model: "gpt-3.5-turbo-0301",
  });
  if (res.status != 200) {
    console.error(`OpenAI returned an error:`);
    console.error(res);
    return "";
  }
  const { content, role } = res.data.choices[0].message!;
  Database.addMessage(guildId, channelId, userId, role, content);
  return content;
};

export { chat };
