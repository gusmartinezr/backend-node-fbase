"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./presentation/routes");
const firebase_database_1 = require("./data/firebase/firebase-database");
const envs_1 = require("./config/envs");
require("dotenv/config");
const server_1 = require("./presentation/server");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("../serviceAccountKey.json"));
// Inicializa Firebase Admin SOLO aquí
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccountKey_json_1.default),
    });
}
(() => {
    main();
})();
async function main() {
    // Solo conecta a Firestore, NO inicialices aquí con credenciales
    firebase_database_1.FirestoreDatabase.connect();
    const server = new server_1.Server({ port: envs_1.envs.PORT, routes: routes_1.AppRoutes.routes });
    server.start();
}
