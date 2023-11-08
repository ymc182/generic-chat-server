import { Request, Response } from "express";
import { completePrompt } from "../lib/openai/chat/completion";

export async function chatCompletionController(req: Request, res: Response) {
  const { messages } = await req.body;
  console.log("BODY", req.body);
  if (!messages) {
    return res.status(400).json({ message: "Messages are required" });
  }

  await completePrompt(messages, res);
}
