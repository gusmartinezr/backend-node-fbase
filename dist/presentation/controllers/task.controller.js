"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const firestore_task_repository_1 = require("../../data/repositories/firestore-task.repository");
const create_task_service_1 = require("../../application/tasks/create-task.service");
const update_task_service_1 = require("../../application/tasks/update-task.service");
const delete_task_service_1 = require("../../application/tasks/delete-task.service");
const list_tasks_service_1 = require("../../application/tasks/list-tasks.service");
const task_presenter_1 = require("../mappers/task.presenter");
const repo = new firestore_task_repository_1.FirestoreTaskRepository();
const createTask = new create_task_service_1.CreateTaskService(repo);
const updateTask = new update_task_service_1.UpdateTaskService(repo);
const deleteTask = new delete_task_service_1.DeleteTaskService(repo);
const listTasks = new list_tasks_service_1.ListTasksService(repo);
class TaskController {
    static async list(req, res) {
        const userId = String(req.query.userId || "");
        const tasks = await listTasks.execute(userId);
        res.json(tasks.map(task_presenter_1.toTaskResponseDTO));
    }
    static async create(req, res) {
        const { title, description, userId } = req.body;
        const created = await createTask.execute({ title, description, userId });
        res.status(201).json((0, task_presenter_1.toTaskResponseDTO)(created));
    }
    static async update(req, res) {
        const id = req.params.id;
        const updated = await updateTask.execute({ id, data: req.body });
        res.json((0, task_presenter_1.toTaskResponseDTO)(updated));
    }
    static async remove(req, res) {
        await deleteTask.execute(req.params.id);
        res.status(204).send();
    }
}
exports.TaskController = TaskController;
