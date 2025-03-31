"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailController = void 0;
const UserDetailService_1 = require("../../services/user/UserDetailService");
class UserDetailController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const detail_user = new UserDetailService_1.UserDetailService();
        const user = await detail_user.execute({ user_id });
        return res.json(user);
    }
}
exports.UserDetailController = UserDetailController;
//# sourceMappingURL=UserDetailController.js.map