"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskService = void 0;
class DeleteTaskService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        if (!id)
            throw new Error("id is required");
        await this.repo.delete(id);
    }
}
exports.DeleteTaskService = DeleteTaskService;
