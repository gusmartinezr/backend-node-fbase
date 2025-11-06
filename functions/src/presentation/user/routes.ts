import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const userController = new UserController(userService);

    router.get("/", userController.getAll);

    return router;
  }
}