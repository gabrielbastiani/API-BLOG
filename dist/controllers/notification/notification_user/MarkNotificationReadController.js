"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkNotificationReadController = void 0;
const MarkNotificationReadService_1 = require("../../../services/notification/notification_user/MarkNotificationReadService");
class MarkNotificationReadController {
    async handle(req, res) {
        const notificationUser_id = req.query.notificationUser_id;
        const notifications = new MarkNotificationReadService_1.MarkNotificationReadService();
        const noti_user = await notifications.execute({ notificationUser_id });
        return res.json(noti_user);
    }
}
exports.MarkNotificationReadController = MarkNotificationReadController;
//# sourceMappingURL=MarkNotificationReadController.js.map