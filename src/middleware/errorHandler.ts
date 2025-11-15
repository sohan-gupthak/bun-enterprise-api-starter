import type { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import logger from "../logger";

// Global error handler with TSOA validation support
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ValidateError) {
    logger.warn({ fields: err?.fields }, "Validation error");
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  const status = (err as any)?.status || 500;
  const message = (err as any)?.message || "Internal Server Error";

  logger.error({ err }, "Unhandled error");
  return res.status(status).json({ message });
}
