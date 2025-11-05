"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, createdAt = Date.now(), id) {
        this.email = email;
        this.createdAt = createdAt;
        this.id = id;
    }
}
exports.User = User;
