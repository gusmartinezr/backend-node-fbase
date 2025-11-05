"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasksQuerySchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, "title requerido").max(120),
    description: zod_1.z.string().trim().max(2000).optional().default(""),
    userId: zod_1.z.string().trim().min(1, "userId requerido")
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1).max(120).optional(),
    description: zod_1.z.string().trim().max(2000).optional(),
    completed: zod_1.z.boolean().optional()
});
exports.listTasksQuerySchema = zod_1.z.object({
    userId: zod_1.z.string().trim().min(1, "userId requerido")
});
