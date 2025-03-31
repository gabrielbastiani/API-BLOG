"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTagController = void 0;
const UpdateTagService_1 = require("../../services/tag/UpdateTagService");
class UpdateTagController {
    async handle(req, res) {
        const { tag_id, tag_name } = req.body;
        const tags = new UpdateTagService_1.UpdateTagService();
        const tag = await tags.execute({
            tag_id,
            tag_name
        });
        return res.json(tag);
    }
}
exports.UpdateTagController = UpdateTagController;
//# sourceMappingURL=UpdateTagController.js.map