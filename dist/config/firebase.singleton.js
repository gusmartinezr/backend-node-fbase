"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const envs_1 = require("./envs");
class FirebaseSingleton {
    static getInstance() {
        if (!FirebaseSingleton.instance) {
            FirebaseSingleton.instance = firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(envs_1.envs.FIREBASE_SERVICE_ACCOUNT_PATH),
            });
            console.log("Firebase initialized successfully (singleton)");
        }
        return FirebaseSingleton.instance;
    }
}
exports.default = FirebaseSingleton;
