"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAllNotificationsAsReadController = void 0;
const MarkAllNotificationsAsReadService_1 = require("../../../services/notification/notification_user/MarkAllNotificationsAsReadService");
class MarkAllNotificationsAsReadController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const notifications = new MarkAllNotificationsAsReadService_1.MarkAllNotificationsAsReadService();
        const noti_user = await notifications.execute({ user_id });
        return res.json(noti_user);
    }
}
exports.MarkAllNotificationsAsReadController = MarkAllNotificationsAsReadController;
//# sourceMappingURL=MarkAllNotificationsAsReadController.js.map