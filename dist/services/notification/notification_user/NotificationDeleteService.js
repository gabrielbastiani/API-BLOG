"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeleteService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class NotificationDeleteService {
    async execute({ id_delete }) {
        const deleteNotification = await prisma_1.default.notificationUser.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        return deleteNotification;
    }
}
exports.NotificationDeleteService = NotificationDeleteService;
//# sourceMappingURL=NotificationDeleteService.js.map