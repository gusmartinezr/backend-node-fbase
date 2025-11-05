"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema, source = "body") => (req, res, next) => {
    try {
        const parsed = schema.parse(req[source]);
        req[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = parsed;
        return next();
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                details: e.issues.map(x => ({ path: x.path.join("."), message: x.message }))
            });
        }
        return next(e);
    }
};
exports.validate = validate;
