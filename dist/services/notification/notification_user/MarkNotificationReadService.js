"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkNotificationReadService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class MarkNotificationReadService {
    async execute({ notificationUser_id }) {
        const user_notification_user = await prisma_1.default.notificationUser.update({
            where: {
                id: notificationUser_id
            },
            data: {
                read: true
            }
        });
        return user_notification_user;
    }
}
exports.MarkNotificationReadService = MarkNotificationReadService;
//# sourceMappingURL=MarkNotificationReadService.js.map