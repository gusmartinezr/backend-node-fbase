import { AppRoutes } from "./presentation/routes";
import { FirestoreDatabase } from "./data/firebase/firebase-database";
import { envs } from "./config/envs";
import "dotenv/config";
import { Server } from "./presentation/server";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

// Inicializa Firebase Admin SOLO aquí
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

(() => {
  main();
})();

async function main() {
  // Solo conecta a Firestore, NO inicialices aquí con credenciales
  FirestoreDatabase.connect();
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  server.start();
}
