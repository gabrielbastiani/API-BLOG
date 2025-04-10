"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateViewsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getClientIp_1 = require("../../middlewares/getClientIp");
function normalizeIp(ip) {
    if (ip === '::1')
        return '127.0.0.1';
    return ip.split(':').pop() || ip; // Remove prefixos IPv6
}
class UpdateViewsService {
    async execute({ post_id, req }) {
        const rawIp = (0, getClientIp_1.getClientIp)(req);
        const ipAddress = normalizeIp(rawIp);
        // Verificação simultânea de existência e atualização
        const [existingView, updatedPost] = await prisma_1.default.$transaction([
            prisma_1.default.postView.findFirst({
                where: {
                    post_id,
                    ipAddress,
                },
            }),
            prisma_1.default.post.update({
                where: { id: post_id },
                data: { views: { increment: 1 } },
                select: { views: true }
            })
        ]);
        if (existingView) {
            await prisma_1.default.post.update({
                where: { id: post_id },
                data: { views: { decrement: 1 } }, // Reverte o incremento
            });
            return { message: "View already counted" };
        }
        await prisma_1.default.postView.create({
            data: {
                post_id,
                ipAddress,
            },
        });
        return {
            message: "View successfully counted",
            views: updatedPost.views
        };
    }
}
exports.UpdateViewsService = UpdateViewsService;
//# sourceMappingURL=UpdateViewsService.js.map