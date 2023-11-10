import OpenAI from "openai";

const { API_KEY } = process.env;
if (!API_KEY) throw new Error("API_KEY is not defined");

const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  const imageResponse = await fetch(
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    },
  );
  const imageResponseJson = await imageResponse.json();
  if (imageResponseJson.error) {
    throw new Error(imageResponseJson.error.message);
  } else {
    return imageResponseJson.data[0].url;
  }
}
