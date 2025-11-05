"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const custom_error_1 = require("../../domain/custom.error");
class UserService {
    constructor() { }
    async getAll() {
        try {
            const query = "Hello world";
            return await query;
        }
        catch (error) {
            throw custom_error_1.CustomError.internalServer(`${error}`);
        }
    }
}
exports.UserService = UserService;
