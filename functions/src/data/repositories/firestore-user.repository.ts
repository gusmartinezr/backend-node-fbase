import FirebaseSingleton from "../../config/firebase.singleton";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { getFirestore, Firestore } from "firebase-admin/firestore";

export class FirestoreUserRepository implements UserRepository {
  private db: Firestore;

  constructor() {
    FirebaseSingleton.getInstance();
    this.db = getFirestore();
  }

  async findByEmail(email: string): Promise<User | null> {
    const q = await this.db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (q.empty) return null;
    const d = q.docs[0];
    return { id: d.id, ...(d.data() as Partial<User>) } as User;
  }

  async create(user: User): Promise<User> {
    const exists = await this.findByEmail(user.email);
    if (exists) return exists;

    const userData: Partial<User> = { ...user };
    if (userData.id === undefined) delete (userData as any).id;

    const ref = await this.db.collection("users").add(userData as any);
    await ref.update({ id: ref.id });
    const doc = await ref.get();
    return { id: ref.id, ...(doc.data() as Partial<User>) } as User;
  }
}
