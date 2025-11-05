import { Request, Response } from "express";
import { FirestoreUserRepository } from "../../data/repositories/firestore-user.repository";
import { FindUserService } from "../../application/users/find-user.service";
import { CreateUserService } from "../../application/users/create-user.service";
import { toUserResponseDTO } from "../mappers/user.presenter";

const repo = new FirestoreUserRepository();
const findUser = new FindUserService(repo);
const createUser = new CreateUserService(repo);

export class UserController {
  static async getByEmail(req: Request, res: Response) {
    const email = String(req.query.email || "");
    const user = await findUser.execute(email);
    if (!user) return res.status(404).json({ found: false });
    return res.json(toUserResponseDTO(user));
  }

  static async create(req: Request, res: Response) {
    const { email } = req.body;
    const user = await createUser.execute(email);
    res.status(201).json(toUserResponseDTO(user));
  }
}
