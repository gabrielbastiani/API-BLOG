"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateViewsController = void 0;
const UpdateViewsService_1 = require("../../services/post/UpdateViewsService");
class UpdateViewsController {
    async handle(req, res) {
        const { post_id } = req.params;
        const service = new UpdateViewsService_1.UpdateViewsService();
        try {
            const result = await service.execute({ post_id, req });
            return res.status(200).json(result);
        }
        catch (err) {
            console.error('Error updating views:', err);
            return res.status(500).json({
                error: err.message || 'Internal server error'
            });
        }
    }
}
exports.UpdateViewsController = UpdateViewsController;
//# sourceMappingURL=UpdateViewsController.js.map