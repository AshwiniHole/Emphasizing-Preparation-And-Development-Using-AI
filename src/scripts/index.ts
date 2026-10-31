import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for client-side usage, though server-side is recommended for production
});

export const chatSession = {
  sendMessage: async (prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini", // Using a cost-effective model, can be changed to gpt-4 or gpt-3.5-turbo
      });

      return {
        response: {
          text: () => completion.choices[0].message.content || ""
        }
      };
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  }
};
