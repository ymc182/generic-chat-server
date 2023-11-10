import OpenAI from "openai";
import "dotenv/config";
import { Response } from "express";

import { ChatCompletionFunctionMessageParam } from "openai/resources";
const { API_KEY } = process.env;
if (!API_KEY) throw new Error("API_KEY is not defined");

const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function completePrompt(
  messages: ChatCompletionFunctionMessageParam[],
  res: Response,
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });
    res.setHeader("Transfer-Encoding", "chunked"); // Required for "stream: true
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    for await (const chunk of completion) {
      if (chunk.choices && chunk.choices[0].delta.content) {
        res.write(
          `data: ${encodeURIComponent(chunk.choices[0].delta.content)}\n\n`,
        );
      }
    }

    res.write(`event: end\ndata:\n\n`);
  } catch (error) {
    console.error("Stream error:", error);
    res.write("event: error\ndata: An error occurred\n\n");
  } finally {
    res.end();
  }
}
