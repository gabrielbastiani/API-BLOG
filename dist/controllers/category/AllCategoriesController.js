"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCategoriesController = void 0;
const AllCategoriesService_1 = require("../../services/category/AllCategoriesService");
class AllCategoriesController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allContacts = new AllCategoriesService_1.AllCategoriesService();
        const contacts = await allContacts.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(contacts);
    }
}
exports.AllCategoriesController = AllCategoriesController;
//# sourceMappingURL=AllCategoriesController.js.map