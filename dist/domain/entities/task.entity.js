"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(title, description, userId, createdAt = Date.now(), completed = false, id) {
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.createdAt = createdAt;
        this.completed = completed;
        this.id = id;
    }
}
exports.Task = Task;
