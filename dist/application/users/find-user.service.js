"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserService = void 0;
class FindUserService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(email) {
        const normalized = email?.trim().toLowerCase();
        if (!normalized)
            throw new Error("email is required");
        return this.repo.findByEmail(normalized);
    }
}
exports.FindUserService = FindUserService;
