import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appErrors";

function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // log the error for debugging purposes
  console.error("Error occurred:", err?.message || err);

  const statusCode = err?.statusCode || 500;

  const errorResponse = {
    error: {
      message: err?.message || "Internal Server Error",
      stack: err?.stack,
    },
  };

  // don't send stack trace in production
  if (process.env.NODE_ENV === "production") {
    errorResponse.error.stack = undefined;
  }

  // send error response to frontend
  res.status(statusCode).json(errorResponse);
}

export default globalErrorHandler;
