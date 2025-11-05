import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "title requerido").max(120),
  description: z.string().trim().max(2000).optional().default(""),
  userId: z.string().trim().min(1, "userId requerido")
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().max(2000).optional(),
  completed: z.boolean().optional()
});

export const listTasksQuerySchema = z.object({
  userId: z.string().trim().min(1, "userId requerido")
});
