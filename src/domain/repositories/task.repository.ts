import { Task } from "../entities/task.entity";

export interface TaskRepository {
  findAllByUser(userId: string): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(id: string, data: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}
