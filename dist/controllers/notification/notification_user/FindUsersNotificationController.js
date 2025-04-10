"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersNotificationController = void 0;
const FindUsersNotificationService_1 = require("../../../services/notification/notification_user/FindUsersNotificationService");
class FindUsersNotificationController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate, user_id } = req.query;
        const allNotifications = new FindUsersNotificationService_1.FindUsersNotificationService();
        const notifications = await allNotifications.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined, user_id ? String(user_id) : undefined);
        return res.json(notifications);
    }
}
exports.FindUsersNotificationController = FindUsersNotificationController;
//# sourceMappingURL=FindUsersNotificationController.js.map