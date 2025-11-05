import { Request, Response } from "express";
import { FirestoreTaskRepository } from "../../data/repositories/firestore-task.repository";
import { CreateTaskService } from "../../application/tasks/create-task.service";
import { UpdateTaskService } from "../../application/tasks/update-task.service";
import { DeleteTaskService } from "../../application/tasks/delete-task.service";
import { ListTasksService } from "../../application/tasks/list-tasks.service";
import { toTaskResponseDTO } from "../mappers/task.presenter";

const repo = new FirestoreTaskRepository();
const createTask = new CreateTaskService(repo);
const updateTask = new UpdateTaskService(repo);
const deleteTask = new DeleteTaskService(repo);
const listTasks = new ListTasksService(repo);

export class TaskController {
  static async list(req: Request, res: Response) {
    const userId = String(req.query.userId || "");
    const tasks = await listTasks.execute(userId);
    res.json(tasks.map(toTaskResponseDTO));
  }

  static async create(req: Request, res: Response) {
    const { title, description, userId } = req.body;
    const created = await createTask.execute({ title, description, userId });
    res.status(201).json(toTaskResponseDTO(created));
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const updated = await updateTask.execute({ id, data: req.body });
    res.json(toTaskResponseDTO(updated));
  }

  static async remove(req: Request, res: Response) {
    await deleteTask.execute(req.params.id);
    res.status(204).send();
  }
}
