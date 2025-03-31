"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: sub },
            select: { id: true, role: true }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = {
            id: user.id,
            role: user.role
        };
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
//# sourceMappingURL=isAuthenticated.js.map