"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const custom_error_1 = require("../../domain/custom.error");
class UserController {
    constructor(service) {
        this.service = service;
        this.handleError = (error, res) => {
            if (error instanceof custom_error_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(`${error}`);
            return res.status(500).json({ error: "Internal server error" });
        };
        this.getAll = (req, res) => {
            this.service
                .getAll()
                .then((u) => res.json(u))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;
