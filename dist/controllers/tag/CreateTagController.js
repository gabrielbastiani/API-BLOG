"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagController = void 0;
const CreateTagService_1 = require("../../services/tag/CreateTagService");
class CreateTagController {
    async handle(req, res) {
        const { tag_name } = req.body;
        const tags = new CreateTagService_1.CreateTagService();
        const tag = await tags.execute({
            tag_name
        });
        return res.json(tag);
    }
}
exports.CreateTagController = CreateTagController;
//# sourceMappingURL=CreateTagController.js.map