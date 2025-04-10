"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUserBlogController = void 0;
const AllUsersBlogService_1 = require("../../../services/user/user_blog/AllUsersBlogService");
class AllUserBlogController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allUsers = new AllUsersBlogService_1.AllUsersBlogService();
        const users = await allUsers.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(users);
    }
}
exports.AllUserBlogController = AllUserBlogController;
//# sourceMappingURL=AllUserBlogController.js.map