import OpenAI from "openai";
import "dotenv/config";
import express from "express";
import chatRouter from "./routes/chat.route";

const app = express();
const port = process.env.PORT || 3001;

const { API_KEY } = process.env;
if (!API_KEY) throw new Error("API_KEY is not defined");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/api", chatRouter);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
