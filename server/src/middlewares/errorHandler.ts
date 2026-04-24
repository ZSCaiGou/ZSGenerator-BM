import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/index.js";
import logger from "../utils/logger.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn({ err }, err.message);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  logger.error({ err }, "Unhandled error");
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
