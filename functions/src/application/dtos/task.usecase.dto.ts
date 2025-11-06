export interface CreateTaskInput {
  title: string;
  description?: string;
  userId: string;
}
export interface CreateTaskOutput {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
