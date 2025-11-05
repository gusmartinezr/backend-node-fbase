import { UserRepository } from "../../domain/repositories/user.repository";

export class FindUserService {
  constructor(private repo: UserRepository) {}

  async execute(email: string) {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) throw new Error("email is required");
    return this.repo.findByEmail(normalized);
  }
}
