// functions/src/data/repositories/firestore-task.repository.ts
import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task } from "../../domain/entities/task.entity";
import FirebaseSingleton from "../../config/firebase.singleton";
import { getFirestore, Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class FirestoreTaskRepository implements TaskRepository {
  private db: Firestore;

  constructor() {
    FirebaseSingleton.getInstance();
    this.db = getFirestore();
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    const snap = await this.db
      .collection("tasks")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((d: QueryDocumentSnapshot) => {
      const data = d.data() as Partial<Task>;
      return { id: d.id, ...data } as Task;
    });
  }

  async create(task: Task): Promise<Task> {
    const taskData: Partial<Task> = { ...task };
    if (taskData.id === undefined) delete (taskData as any).id;

    const ref = await this.db.collection("tasks").add(taskData as any);
    const doc = await ref.get();
    return { id: ref.id, ...(doc.data() as Partial<Task>) } as Task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await this.db.collection("tasks").doc(id).update(data as any);
    const doc = await this.db.collection("tasks").doc(id).get();
    return { id: doc.id, ...(doc.data() as Partial<Task>) } as Task;
  }

  async delete(id: string): Promise<void> {
    await this.db.collection("tasks").doc(id).delete();
  }
}
