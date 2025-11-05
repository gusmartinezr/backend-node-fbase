import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  JWT_SEED: get("JWT_SECRET").required().asString(),
  FIREBASE_SERVICE_ACCOUNT_PATH: get("FIREBASE_SERVICE_ACCOUNT_PATH").required().asString()
};
