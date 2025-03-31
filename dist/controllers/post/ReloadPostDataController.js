"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadPostDataController = void 0;
const ReloadPostDataService_1 = require("../../services/post/ReloadPostDataService");
class ReloadPostDataController {
    async handle(req, res) {
        const post_id = req.query.post_id;
        const post_content = new ReloadPostDataService_1.ReloadPostDataService();
        const post = await post_content.execute({ post_id });
        return res.json(post);
    }
}
exports.ReloadPostDataController = ReloadPostDataController;
//# sourceMappingURL=ReloadPostDataController.js.map