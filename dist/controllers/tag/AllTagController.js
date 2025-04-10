"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllTagController = void 0;
const AllTagsService_1 = require("../../services/tag/AllTagsService");
class AllTagController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allTags = new AllTagsService_1.AllTagsService();
        const tags = await allTags.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(tags);
    }
}
exports.AllTagController = AllTagController;
//# sourceMappingURL=AllTagController.js.map