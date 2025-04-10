"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getClientIp_1 = require("../../middlewares/getClientIp");
function normalizeIp(ip) {
    if (ip === '::1') {
        return '127.0.0.1'; // Normaliza o localhost IPv6 para IPv4
    }
    return ip;
}
class PostLikeService {
    async execute({ post_id, req, isLike }) {
        const ipAddress = normalizeIp((0, getClientIp_1.getClientIp)(req));
        const existingLike = await prisma_1.default.postLike.findFirst({
            where: {
                post_id,
                ipAddress: ipAddress
            },
        });
        if (existingLike) {
            if (existingLike.isLike === isLike) {
                return { message: "Você já registrou esta interação e ela não pode ser repetida." };
            }
            await prisma_1.default.postLike.update({
                where: { id: existingLike.id },
                data: { isLike },
            });
            if (isLike) {
                await prisma_1.default.post.update({
                    where: { id: post_id },
                    data: {
                        post_like: { increment: 1 },
                        post_dislike: { decrement: 1 },
                    },
                });
            }
            else {
                await prisma_1.default.post.update({
                    where: { id: post_id },
                    data: {
                        post_like: { decrement: 1 },
                        post_dislike: { increment: 1 },
                    },
                });
            }
            return { message: "Interação atualizada com sucesso." };
        }
        else {
            await prisma_1.default.postLike.create({
                data: {
                    post_id,
                    ipAddress,
                    isLike,
                },
            });
            if (isLike) {
                await prisma_1.default.post.update({
                    where: { id: post_id },
                    data: { post_like: { increment: 1 } },
                });
            }
            else {
                await prisma_1.default.post.update({
                    where: { id: post_id },
                    data: { post_dislike: { increment: 1 } },
                });
            }
            return { message: "Interação registrada com sucesso." };
        }
    }
}
exports.PostLikeService = PostLikeService;
//# sourceMappingURL=PostLikeService.js.map