"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogDetailController = void 0;
const UserBlogDetailService_1 = require("../../../services/user/user_blog/UserBlogDetailService");
class UserBlogDetailController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const detail_user = new UserBlogDetailService_1.UserBlogDetailService();
        const user = await detail_user.execute({ user_id });
        return res.json(user);
    }
}
exports.UserBlogDetailController = UserBlogDetailController;
//# sourceMappingURL=UserBlogDetailController.js.map