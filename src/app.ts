import { AppRoutes } from "./presentation/routes";
import { FirestoreDatabase } from "./data/firebase/firebase-database";
import { envs } from "./config/envs";
import "dotenv/config";
import { Server } from "./presentation/server";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// --- Inicialización de Firebase Admin ---
let serviceAccount: admin.ServiceAccount;

// Ruta local para desarrollo
const localPath = path.join(__dirname, "../serviceAccountKey.json");

if (fs.existsSync(localPath)) {
  // ✅ Desarrollo: archivo local
  serviceAccount = JSON.parse(fs.readFileSync(localPath, "utf-8"));
  console.log("Usando service account local ✅");
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  // ✅ Producción: variable de entorno Base64
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  serviceAccount = JSON.parse(Buffer.from(b64!, "base64").toString("utf-8"));
  console.log("Usando service account desde Base64 ✅");
} else {
  throw new Error("No se encontró service account ni archivo local ni variable de entorno");
}

if (!serviceAccount.privateKey) {
  throw new Error("La clave privada no está definida en el service account");
}
serviceAccount.privateKey = serviceAccount.privateKey.replace(/\\n/g, "\n");

// Inicializa Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

console.log("Firebase Admin inicializado correctamente ✅");

// --- Arranque del servidor ---
(async () => {
  FirestoreDatabase.connect();
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  server.start();
})();
