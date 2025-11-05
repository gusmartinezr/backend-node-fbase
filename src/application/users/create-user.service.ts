import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";

export class CreateUserService {
  constructor(private repo: UserRepository) {}

  async execute(email: string) {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) throw new Error("email is required");
    const exists = await this.repo.findByEmail(normalized);
    if (exists) return exists;
    const user = new User(normalized);
    return this.repo.create(user);
  }
}
