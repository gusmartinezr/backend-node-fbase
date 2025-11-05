"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepository = void 0;
const firebase_singleton_1 = __importDefault(require("../../config/firebase.singleton"));
class FirestoreTaskRepository {
    constructor() {
        this.db = firebase_singleton_1.default.getInstance().firestore();
    }
    async findAllByUser(userId) {
        const snap = await this.db
            .collection("tasks")
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
    async create(task) {
        const taskData = { ...task };
        if (taskData.id === undefined)
            delete taskData.id;
        const ref = await this.db.collection("tasks").add(taskData);
        const doc = await ref.get();
        console.log("Created task data:", doc.data());
        return { id: ref.id, ...doc.data() };
    }
    async update(id, data) {
        await this.db.collection("tasks").doc(id).update(data);
        const doc = await this.db.collection("tasks").doc(id).get();
        return { id: doc.id, ...doc.data() };
    }
    async delete(id) {
        await this.db.collection("tasks").doc(id).delete();
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
