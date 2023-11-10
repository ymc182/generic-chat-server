import { Router } from "express";
import { AccessMiddleware } from "../middleware/api-key";
import { imageGenerateController } from "../controllers/image.controller";

const imageRouter = Router();

imageRouter.post("/image", AccessMiddleware, imageGenerateController);

export default imageRouter;
