"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperUserPublicController = void 0;
const SuperUserPublicService_1 = require("../../services/user/SuperUserPublicService");
class SuperUserPublicController {
    async handle(req, res) {
        const user_super = new SuperUserPublicService_1.SuperUserPublicService();
        const user = await user_super.execute();
        return res.json(user);
    }
}
exports.SuperUserPublicController = SuperUserPublicController;
//# sourceMappingURL=SuperUserPublicController.js.map