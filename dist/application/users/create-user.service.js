"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
class CreateUserService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(email) {
        const normalized = email?.trim().toLowerCase();
        if (!normalized)
            throw new Error("email is required");
        const exists = await this.repo.findByEmail(normalized);
        if (exists)
            return exists;
        const user = new user_entity_1.User(normalized);
        return this.repo.create(user);
    }
}
exports.CreateUserService = CreateUserService;
