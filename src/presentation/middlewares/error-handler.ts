import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.statusCode ?? 500;
  const code   = err?.code ?? "INTERNAL_ERROR";
  const msg    = err?.message ?? "Unexpected error";
  res.status(status).json({ error: code, message: msg });
}
