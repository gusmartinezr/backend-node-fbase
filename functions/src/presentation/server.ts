import express, { Router } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";

interface Options { port: number; routes: Router }

export class Server {
  private readonly app = express();
  constructor(private readonly opts: Options) {}

  async start() {
    // CORS: si FRONTEND_URL no está seteado, permite cualquier origen (dev)
    const allowed = (process.env.FRONTEND_URL || "").split(",").map(s => s.trim()).filter(Boolean);
    this.app.use(cors({
      origin: (origin, cb) => {
        if (!origin || allowed.length === 0 || allowed.includes(origin)) return cb(null, true);
        cb(new Error("CORS_NOT_ALLOWED"));
      }
    }));

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Rutas
    this.app.use(this.opts.routes);

    // Error handler (debe ir al final, antes del listen)
    this.app.use(errorHandler);

    this.app.listen(this.opts.port, () => {
      console.log(`Server is running on http://localhost:${this.opts.port}`);
    });
  }
}
