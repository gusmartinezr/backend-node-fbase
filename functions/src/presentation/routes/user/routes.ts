import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { validate } from "../../middlewares/validate";
import { findUserQuerySchema, createUserSchema } from "../../validation/user.schemas";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    router.get("/", validate(findUserQuerySchema, "query"), UserController.getByEmail);
    router.post("/", validate(createUserSchema), UserController.create);
    return router;
  }
}
