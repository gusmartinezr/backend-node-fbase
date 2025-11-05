"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    JWT_SEED: (0, env_var_1.get)("JWT_SECRET").required().asString(),
    FIREBASE_SERVICE_ACCOUNT_PATH: (0, env_var_1.get)("FIREBASE_SERVICE_ACCOUNT_PATH").required().asString()
};
