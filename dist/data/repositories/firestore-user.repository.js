"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const firebase_singleton_1 = __importDefault(require("../../config/firebase.singleton"));
class FirestoreUserRepository {
    constructor() {
        this.db = firebase_singleton_1.default.getInstance().firestore();
    }
    async findByEmail(email) {
        const q = await this.db
            .collection("users")
            .where("email", "==", email)
            .limit(1)
            .get();
        if (q.empty)
            return null;
        const d = q.docs[0];
        return { id: d.id, ...d.data() };
    }
    async create(user) {
        const exists = await this.findByEmail(user.email);
        if (exists)
            return exists;
        const userData = { ...user };
        if (userData.id === undefined)
            delete userData.id;
        const ref = await this.db.collection("users").add(userData);
        await ref.update({ id: ref.id });
        const doc = await ref.get();
        return { id: ref.id, ...doc.data() };
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
