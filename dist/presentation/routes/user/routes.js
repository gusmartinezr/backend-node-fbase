"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const validate_1 = require("../../middlewares/validate");
const user_schemas_1 = require("../../validation/user.schemas");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.get("/", (0, validate_1.validate)(user_schemas_1.findUserQuerySchema, "query"), user_controller_1.UserController.getByEmail);
        router.post("/", (0, validate_1.validate)(user_schemas_1.createUserSchema), user_controller_1.UserController.create);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
