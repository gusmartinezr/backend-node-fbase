"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponseDTO = void 0;
const toUserResponseDTO = (u) => ({
    id: u.id,
    email: u.email,
    createdAt: u.createdAt
});
exports.toUserResponseDTO = toUserResponseDTO;
