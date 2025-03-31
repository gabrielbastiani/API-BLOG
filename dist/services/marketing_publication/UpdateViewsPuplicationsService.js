"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateViewsPuplicationsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getClientIp_1 = require("../../middlewares/getClientIp");
function normalizeIp(ip) {
    if (ip === '::1') {
        return '127.0.0.1'; // Normaliza o localhost IPv6 para IPv4
    }
    return ip;
}
class UpdateViewsPuplicationsService {
    async execute({ marketingPublication_id, req }) {
        const ipAddress = normalizeIp((0, getClientIp_1.getClientIp)(req));
        const existingView = await prisma_1.default.marketingPublicationView.findFirst({
            where: {
                marketingPublication_id,
                ipAddress: ipAddress,
            },
        });
        if (existingView) {
            return { message: "View already counted" };
        }
        await prisma_1.default.marketingPublicationView.create({
            data: {
                marketingPublication_id,
                ipAddress: ipAddress,
            },
        });
        await prisma_1.default.marketingPublication.update({
            where: { id: marketingPublication_id },
            data: { clicks: { increment: 1 } },
        });
        return { message: "View successfully counted" };
    }
}
exports.UpdateViewsPuplicationsService = UpdateViewsPuplicationsService;
//# sourceMappingURL=UpdateViewsPuplicationsService.js.map