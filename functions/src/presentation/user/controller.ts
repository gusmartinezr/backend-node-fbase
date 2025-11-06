import { Request, Response } from "express";
import { CustomError } from "../../domain/custom.error";
import { UserService } from "../services/user.service";


export class UserController {
    constructor(private readonly service: UserService) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal server error" });
    };

    getAll = (req: Request, res: Response) => {
        this.service
            .getAll()
            .then((u) => res.json(u))
            .catch((error) => this.handleError(error, res));
    };
}