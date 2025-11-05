"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const firestore_user_repository_1 = require("../../data/repositories/firestore-user.repository");
const find_user_service_1 = require("../../application/users/find-user.service");
const create_user_service_1 = require("../../application/users/create-user.service");
const user_presenter_1 = require("../mappers/user.presenter");
const repo = new firestore_user_repository_1.FirestoreUserRepository();
const findUser = new find_user_service_1.FindUserService(repo);
const createUser = new create_user_service_1.CreateUserService(repo);
class UserController {
    static async getByEmail(req, res) {
        const email = String(req.query.email || "");
        const user = await findUser.execute(email);
        if (!user)
            return res.status(404).json({ found: false });
        return res.json((0, user_presenter_1.toUserResponseDTO)(user));
    }
    static async create(req, res) {
        const { email } = req.body;
        const user = await createUser.execute(email);
        res.status(201).json((0, user_presenter_1.toUserResponseDTO)(user));
    }
}
exports.UserController = UserController;
