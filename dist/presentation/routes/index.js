"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./user/routes");
const routes_2 = require("./task/routes");
class AppRoutes {
    static get routes() {
        const r = (0, express_1.Router)();
        // healthcheck
        r.get("/health", (_req, res) => res.json({ ok: true }));
        r.use("/api/users", routes_1.UserRoutes.routes);
        r.use("/api/tasks", routes_2.TaskRoutes.routes);
        r.use((_req, res) => res.status(404).json({ error: "NOT_FOUND" }));
        return r;
    }
}
exports.AppRoutes = AppRoutes;
