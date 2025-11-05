import { Router } from "express";
import { TaskController } from "../../controllers/task.controller";
import { validate } from "../../middlewares/validate";
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from "../../validation/task.schemas";

export class TaskRoutes {
  static get routes(): Router {
    const router = Router();
    router.get("/", validate(listTasksQuerySchema, "query"), TaskController.list);
    router.post("/", validate(createTaskSchema), TaskController.create);
    router.put("/:id", validate(updateTaskSchema), TaskController.update);
    router.delete("/:id", TaskController.remove);
    return router;
  }
}
