import { CustomError } from "../../domain/custom.error";


export class UserService{
    constructor(){}

    public async getAll() {
    try {
      const query = "Hello world"
      return await query;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}