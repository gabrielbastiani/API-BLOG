"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUserController = void 0;
const AllUsersService_1 = require("../../services/user/AllUsersService");
class AllUserController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate, user_id } = req.query;
        const allUsers = new AllUsersService_1.AllUsersService();
        const users = await allUsers.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined, String(user_id));
        return res.json(users);
    }
}
exports.AllUserController = AllUserController;
//# sourceMappingURL=AllUserController.js.map