"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAllNotificationsAsReadService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class MarkAllNotificationsAsReadService {
    async execute({ user_id }) {
        const user_notification_user = await prisma_1.default.notificationUser.updateMany({
            where: {
                read: false,
                user_id: user_id,
            },
            data: {
                read: true
            }
        });
        return user_notification_user;
    }
}
exports.MarkAllNotificationsAsReadService = MarkAllNotificationsAsReadService;
//# sourceMappingURL=MarkAllNotificationsAsReadService.js.map