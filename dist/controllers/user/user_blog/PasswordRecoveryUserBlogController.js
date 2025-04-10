"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryUserBlogController = void 0;
const PasswordRecoveryUserBlogSevice_1 = require("../../../services/user/user_blog/PasswordRecoveryUserBlogSevice");
class PasswordRecoveryUserBlogController {
    async handle(req, res) {
        const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id;
        const { password } = req.body;
        const passwordRecovery = new PasswordRecoveryUserBlogSevice_1.PasswordRecoveryUserBlogSevice();
        const recoveryPassword = await passwordRecovery.execute({
            passwordRecoveryUser_id,
            password,
        });
        return res.json(recoveryPassword);
    }
}
exports.PasswordRecoveryUserBlogController = PasswordRecoveryUserBlogController;
//# sourceMappingURL=PasswordRecoveryUserBlogController.js.map