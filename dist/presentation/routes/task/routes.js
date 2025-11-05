"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = require("express");
const task_controller_1 = require("../../controllers/task.controller");
const validate_1 = require("../../middlewares/validate");
const task_schemas_1 = require("../../validation/task.schemas");
class TaskRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.get("/", (0, validate_1.validate)(task_schemas_1.listTasksQuerySchema, "query"), task_controller_1.TaskController.list);
        router.post("/", (0, validate_1.validate)(task_schemas_1.createTaskSchema), task_controller_1.TaskController.create);
        router.put("/:id", (0, validate_1.validate)(task_schemas_1.updateTaskSchema), task_controller_1.TaskController.update);
        router.delete("/:id", task_controller_1.TaskController.remove);
        return router;
    }
}
exports.TaskRoutes = TaskRoutes;
