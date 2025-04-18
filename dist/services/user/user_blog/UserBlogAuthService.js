"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogAuthService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserBlogAuthService {
    async execute({ email, password }) {
        const user = await prisma_1.default.userBlog.findFirst({
            where: {
                email: email,
                status: "Disponivel"
            }
        });
        if (!user) {
            throw new Error("User/password incorrect");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("User/password incorrect");
        }
        await prisma_1.default.userBlog.update({
            where: {
                id: user.id
            },
            data: {
                last_access: new Date()
            }
        });
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, /* @ts-ignore */ process.env?.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}
exports.UserBlogAuthService = UserBlogAuthService;
//# sourceMappingURL=UserBlogAuthService.js.map