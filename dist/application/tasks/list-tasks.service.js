"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasksService = void 0;
class ListTasksService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId) {
        if (!userId)
            throw new Error("userId is required");
        return this.repo.findAllByUser(userId);
    }
}
exports.ListTasksService = ListTasksService;
