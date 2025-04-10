"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNotificationController = void 0;
const FindNotificationService_1 = require("../../../services/notification/notification_user/FindNotificationService");
class FindNotificationController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const notifications = new FindNotificationService_1.FindNotificationService();
        const noti_user = await notifications.execute({ user_id });
        return res.json(noti_user);
    }
}
exports.FindNotificationController = FindNotificationController;
//# sourceMappingURL=FindNotificationController.js.map