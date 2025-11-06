import { Task } from "../../domain/entities/task.entity";
import { TaskResponseDTO } from "../dtos/task.response.dto";

export const toTaskResponseDTO = (t: Task): TaskResponseDTO => ({
  id: t.id!,
  title: t.title,
  description: t.description,
  userId: t.userId,
  completed: t.completed,
  createdAt: t.createdAt
});
