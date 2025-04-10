"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryUserController = void 0;
const PasswordRecoveryUserSevice_1 = require("../../services/user/PasswordRecoveryUserSevice");
class PasswordRecoveryUserController {
    async handle(req, res) {
        const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id;
        const { password } = req.body;
        const passwordRecovery = new PasswordRecoveryUserSevice_1.PasswordRecoveryUserSevice();
        const recoveryPassword = await passwordRecovery.execute({
            passwordRecoveryUser_id,
            password,
        });
        return res.json(recoveryPassword);
    }
}
exports.PasswordRecoveryUserController = PasswordRecoveryUserController;
//# sourceMappingURL=PasswordRecoveryUserController.js.map