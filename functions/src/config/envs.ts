import "dotenv/config";
import { get } from "env-var";
import * as functions from "firebase-functions";

const isEmulator = !!process.env.FUNCTIONS_EMULATOR;
const isOnFirebase = !!process.env.K_SERVICE || !!process.env.FUNCTION_TARGET;

export const envs = {
  PORT: get("PORT").default("5001").asPortNumber(),
  JWT_SEED: isOnFirebase
    ? functions.config().env?.jwt_secret ?? "change-me"
    : get("JWT_SECRET").default("change-me").asString(),
  FRONTEND_URL: isOnFirebase
    ? functions.config().env?.frontend_url ?? ""
    : get("FRONTEND_URL").default("").asString(),

  // Solo requerida en emulador; en prod NO existe
  FIREBASE_SERVICE_ACCOUNT_PATH: isEmulator
    ? get("FIREBASE_SERVICE_ACCOUNT_PATH").required().asString()
    : undefined,
};
