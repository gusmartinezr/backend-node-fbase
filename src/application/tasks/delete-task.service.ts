import { TaskRepository } from "../../domain/repositories/task.repository";

export class DeleteTaskService {
  constructor(private repo: TaskRepository) {}

  async execute(id: string) {
    if (!id) throw new Error("id is required");
    await this.repo.delete(id);
  }
}
