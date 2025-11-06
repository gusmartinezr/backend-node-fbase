import { z } from "zod";

export const findUserQuerySchema = z.object({
  email: z.string().trim().email("email inválido")
});

export const createUserSchema = z.object({
  email: z.string().trim().email("email inválido")
});
