import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task } from "../../domain/entities/task.entity";

type Input = { id: string; data: Partial<Task> };

export class UpdateTaskService {
  constructor(private repo: TaskRepository) {}

  async execute({ id, data }: Input) {
    if (!id) throw new Error("id is required");
    return this.repo.update(id, data);
  }
}
