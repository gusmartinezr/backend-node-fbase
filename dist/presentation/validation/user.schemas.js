"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = exports.findUserQuerySchema = void 0;
const zod_1 = require("zod");
exports.findUserQuerySchema = zod_1.z.object({
    email: zod_1.z.string().trim().email("email inválido")
});
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email("email inválido")
});
