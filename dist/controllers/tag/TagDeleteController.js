"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDeleteController = void 0;
const TagDeleteService_1 = require("../../services/tag/TagDeleteService");
class TagDeleteController {
    async handle(req, res) {
        const { id_delete } = req.body;
        const tagService = new TagDeleteService_1.TagDeleteService();
        const tagDelete = await tagService.execute({
            id_delete
        });
        return res.json(tagDelete);
    }
}
exports.TagDeleteController = TagDeleteController;
//# sourceMappingURL=TagDeleteController.js.map