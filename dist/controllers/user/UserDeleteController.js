"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteController = void 0;
const UserDeleteService_1 = require("../../services/user/UserDeleteService");
class UserDeleteController {
    async handle(req, res) {
        let { id_delete, name, user_id } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const detail_user = new UserDeleteService_1.UserDeleteService();
        const user = await detail_user.execute({ id_delete, name, user_id });
        return res.json(user);
    }
}
exports.UserDeleteController = UserDeleteController;
//# sourceMappingURL=UserDeleteController.js.map