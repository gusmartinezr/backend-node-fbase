import FirebaseSingleton from "../../config/firebase.singleton";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class FirestoreUserRepository implements UserRepository {
  private db = FirebaseSingleton.getInstance().firestore();

  async findByEmail(email: string): Promise<User | null> {
    const q = await this.db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (q.empty) return null;
    const d = q.docs[0];
    return { id: d.id, ...(d.data() as any) } as User;
  }

  async create(user: User): Promise<User> {
    const exists = await this.findByEmail(user.email);
    if (exists) return exists;
    const userData = { ...user };
    if (userData.id === undefined) delete userData.id;
    const ref = await this.db.collection("users").add(userData);
    await ref.update({ id: ref.id });
    const doc = await ref.get();
    return { id: ref.id, ...(doc.data() as any) } as User;
  }
}
