"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
const UserAuthService_1 = require("../../services/user/UserAuthService");
class UserAuthController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authUserService = new UserAuthService_1.UserAuthService();
        const auth = await authUserService.execute({
            email,
            password
        });
        return res.json(auth);
    }
}
exports.UserAuthController = UserAuthController;
//# sourceMappingURL=UserAuthController.js.map