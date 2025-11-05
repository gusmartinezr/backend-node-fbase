"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskService = void 0;
const task_entity_1 = require("../../domain/entities/task.entity");
class CreateTaskService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const title = input.title?.trim();
        const description = (input.description ?? "").trim();
        const userId = input.userId?.trim();
        if (!title)
            throw new Error("title is required");
        if (!userId)
            throw new Error("userId is required");
        const task = new task_entity_1.Task(title, description, userId);
        return this.repo.create(task);
    }
}
exports.CreateTaskService = CreateTaskService;
