"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNotificationService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class FindNotificationService {
    async execute({ user_id }) {
        const user_notification_user = await prisma_1.default.notificationUser.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return user_notification_user;
    }
}
exports.FindNotificationService = FindNotificationService;
//# sourceMappingURL=FindNotificationService.js.map