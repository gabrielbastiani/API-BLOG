"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordUserRecoveryController = void 0;
const RequestPasswordUserRecoveryService_1 = require("../../services/user/RequestPasswordUserRecoveryService");
class RequestPasswordUserRecoveryController {
    async handle(req, res) {
        const { email } = req.body;
        const requestPasswordRecovery = new RequestPasswordUserRecoveryService_1.RequestPasswordUserRecoveryService();
        const user = await requestPasswordRecovery.execute({
            email,
        });
        return res.json(user);
    }
}
exports.RequestPasswordUserRecoveryController = RequestPasswordUserRecoveryController;
//# sourceMappingURL=RequestPasswordUserRecoveryController.js.map