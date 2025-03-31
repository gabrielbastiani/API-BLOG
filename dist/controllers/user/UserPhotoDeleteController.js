"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPhotoDeleteController = void 0;
const UserPhotoDeleteService_1 = require("../../services/user/UserPhotoDeleteService");
class UserPhotoDeleteController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const detail_user = new UserPhotoDeleteService_1.UserPhotoDeleteService();
        const user = await detail_user.execute({ user_id });
        return res.json(user);
    }
}
exports.UserPhotoDeleteController = UserPhotoDeleteController;
//# sourceMappingURL=UserPhotoDeleteController.js.map