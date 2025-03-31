"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeleteController = void 0;
const NotificationDeleteService_1 = require("../../../services/notification/notification_user/NotificationDeleteService");
class NotificationDeleteController {
    async handle(req, res) {
        const { id_delete } = req.body;
        const formContactDeleteService = new NotificationDeleteService_1.NotificationDeleteService();
        const deleteNotification = await formContactDeleteService.execute({
            id_delete
        });
        return res.json(deleteNotification);
    }
}
exports.NotificationDeleteController = NotificationDeleteController;
//# sourceMappingURL=NotificationDeleteController.js.map