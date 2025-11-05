import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task } from "../../domain/entities/task.entity";
import FirebaseSingleton from "../../config/firebase.singleton";

export class FirestoreTaskRepository implements TaskRepository {
  private db = FirebaseSingleton.getInstance().firestore();

  async findAllByUser(userId: string): Promise<Task[]> {
    const snap = await this.db
      .collection("tasks")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Task));
  }

  async create(task: Task): Promise<Task> {
    const taskData = { ...task };
    if (taskData.id === undefined) delete taskData.id;
    const ref = await this.db.collection("tasks").add(taskData);
    const doc = await ref.get();
    console.log("Created task data:", doc.data());
    return { id: ref.id, ...(doc.data() as any) } as Task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await this.db.collection("tasks").doc(id).update(data);
    const doc = await this.db.collection("tasks").doc(id).get();
    return { id: doc.id, ...(doc.data() as any) } as Task;
  }

  async delete(id: string): Promise<void> {
    await this.db.collection("tasks").doc(id).delete();
  }
}
