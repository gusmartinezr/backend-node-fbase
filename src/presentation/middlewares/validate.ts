import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<any>, source: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);
      (req as any)[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = parsed;
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "VALIDATION_ERROR",
          details: e.issues.map(x => ({ path: x.path.join("."), message: x.message }))
        });
      }
      return next(e);
    }
  };