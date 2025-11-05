import { TaskRepository } from "../../domain/repositories/task.repository";

export class ListTasksService {
  constructor(private repo: TaskRepository) {}

  async execute(userId: string) {
    if (!userId) throw new Error("userId is required");
    return this.repo.findAllByUser(userId);
  }
}
