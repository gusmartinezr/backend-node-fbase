import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { TaskRoutes } from "./task/routes";

export class AppRoutes {
  static get routes(): Router {
    const r = Router();

    // healthcheck
    r.get("/health", (_req, res) => res.json({ ok: true }));
    
    r.use("/api/users", UserRoutes.routes);
    r.use("/api/tasks", TaskRoutes.routes);


    r.use((_req, res) => res.status(404).json({ error: "NOT_FOUND" }));
    return r;
  }
}
