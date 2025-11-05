import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task } from "../../domain/entities/task.entity";
import { CreateTaskInput } from "../dtos/task.usecase.dto";

export class CreateTaskService {
  constructor(private repo: TaskRepository) {}

  async execute(input: CreateTaskInput) {
    const title = input.title?.trim();
    const description = (input.description ?? "").trim();
    const userId = input.userId?.trim();

    if (!title) throw new Error("title is required");
    if (!userId) throw new Error("userId is required");

    const task = new Task(title, description, userId);
    return this.repo.create(task);
  }
}
