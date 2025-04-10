"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogAuthController = void 0;
const UserBlogAuthService_1 = require("../../../services/user/user_blog/UserBlogAuthService");
class UserBlogAuthController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authUserService = new UserBlogAuthService_1.UserBlogAuthService();
        const auth = await authUserService.execute({
            email,
            password
        });
        return res.json(auth);
    }
}
exports.UserBlogAuthController = UserBlogAuthController;
//# sourceMappingURL=UserBlogAuthController.js.map