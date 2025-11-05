"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTaskResponseDTO = void 0;
const toTaskResponseDTO = (t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    userId: t.userId,
    completed: t.completed,
    createdAt: t.createdAt
});
exports.toTaskResponseDTO = toTaskResponseDTO;
