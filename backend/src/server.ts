import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppError from "./errors/appErrors";
import globalErrorHandler from "./middlewares/globalErrorHandler";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: string | number = process.env.PORT || 8080;

app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Server is healthy and running on port ${PORT}` });
});

app.get("/throw-error", async (req: Request, res: Response) => {
  throw new AppError("This is a test error", 400);
});

// register error-handling middleware after all routes
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
