"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err?.statusCode ?? 500;
    const code = err?.code ?? "INTERNAL_ERROR";
    const msg = err?.message ?? "Unexpected error";
    res.status(status).json({ error: code, message: msg });
}
