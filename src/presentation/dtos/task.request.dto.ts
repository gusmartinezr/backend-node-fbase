export interface CreateTaskRequestDTO {
  title: string;
  description?: string;
  userId: string;
}
export interface UpdateTaskRequestDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
export interface ListTasksQueryDTO {
  userId: string;
}
