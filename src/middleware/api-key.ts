import { NextFunction, Request, Response } from "express";

export function AccessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const x_api_key = req.get("x-api-key");
  if (!x_api_key) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (x_api_key !== process.env.X_API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next();
}
