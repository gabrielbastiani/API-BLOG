"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogDeleteController = void 0;
const UserBlogDeleteService_1 = require("../../../services/user/user_blog/UserBlogDeleteService");
class UserBlogDeleteController {
    async handle(req, res) {
        let { id_delete, name, user_id } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const detail_user = new UserBlogDeleteService_1.UserBlogDeleteService();
        const user = await detail_user.execute({ id_delete, name, user_id });
        return res.json(user);
    }
}
exports.UserBlogDeleteController = UserBlogDeleteController;
//# sourceMappingURL=UserBlogDeleteController.js.map