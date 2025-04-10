"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordUserBlogRecoveryController = void 0;
const RequestPasswordUserBlogRecoveryService_1 = require("../../../services/user/user_blog/RequestPasswordUserBlogRecoveryService");
class RequestPasswordUserBlogRecoveryController {
    async handle(req, res) {
        const { email } = req.body;
        const requestPasswordRecovery = new RequestPasswordUserBlogRecoveryService_1.RequestPasswordUserBlogRecoveryService();
        const user = await requestPasswordRecovery.execute({
            email,
        });
        return res.json(user);
    }
}
exports.RequestPasswordUserBlogRecoveryController = RequestPasswordUserBlogRecoveryController;
//# sourceMappingURL=RequestPasswordUserBlogRecoveryController.js.map