import { Router } from "express";
import { chatCompletionController } from "../controllers/chat.controller";
import { AccessMiddleware } from "../middleware/api-key";

const chatRouter = Router();

chatRouter.post("/chat", AccessMiddleware, chatCompletionController);

export default chatRouter;
