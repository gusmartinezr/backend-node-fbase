"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middlewares/error-handler");
class Server {
    constructor(opts) {
        this.opts = opts;
        this.app = (0, express_1.default)();
    }
    async start() {
        // CORS: si FRONTEND_URL no está seteado, permite cualquier origen (dev)
        const allowed = (process.env.FRONTEND_URL || "").split(",").map(s => s.trim()).filter(Boolean);
        this.app.use((0, cors_1.default)({
            origin: (origin, cb) => {
                if (!origin || allowed.length === 0 || allowed.includes(origin))
                    return cb(null, true);
                cb(new Error("CORS_NOT_ALLOWED"));
            }
        }));
        this.app.use(express_1.default.json({ limit: "10mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
        // Rutas
        this.app.use(this.opts.routes);
        // Error handler (debe ir al final, antes del listen)
        this.app.use(error_handler_1.errorHandler);
        this.app.listen(this.opts.port, () => {
            console.log(`Server is running on http://localhost:${this.opts.port}`);
        });
    }
}
exports.Server = Server;
