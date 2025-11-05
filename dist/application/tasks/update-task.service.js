"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskService = void 0;
class UpdateTaskService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute({ id, data }) {
        if (!id)
            throw new Error("id is required");
        return this.repo.update(id, data);
    }
}
exports.UpdateTaskService = UpdateTaskService;
