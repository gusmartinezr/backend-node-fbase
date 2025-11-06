
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class FindUserService {
  constructor(private repo: UserRepository, ) {}

  async execute(email: string) {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) throw new Error("email is required");

    const existing = await this.repo.findByEmail(normalized);
    if (existing) return existing;

    const newUser = new User(normalized);
    await this.repo.create(newUser);
    return this.repo.findByEmail(normalized);
  }
}