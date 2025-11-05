import { User } from "../../domain/entities/user.entity";
import { UserResponseDTO } from "../dtos/user.response.dto";

export const toUserResponseDTO = (u: User): UserResponseDTO => ({
  id: u.id!,
  email: u.email,
  createdAt: u.createdAt
});
