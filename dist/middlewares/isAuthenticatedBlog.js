"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedBlog = isAuthenticatedBlog;
const jsonwebtoken_1 = require("jsonwebtoken");
async function isAuthenticatedBlog(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, /* @ts-ignore */ process.env?.JWT_SECRET);
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
//# sourceMappingURL=isAuthenticatedBlog.js.map