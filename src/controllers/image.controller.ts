import { Request, Response } from "express";
import { generateImage } from "../lib/openai/image/generate";

export async function imageGenerateController(req: Request, res: Response) {
  try {
    const { prompt } = await req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Messages are required" });
    }

    const imageUrl = await generateImage(prompt);
    console.log("imageUrl:", imageUrl);
    return res.status(200).json({ imageUrl });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error generateImage" });
  }
}
