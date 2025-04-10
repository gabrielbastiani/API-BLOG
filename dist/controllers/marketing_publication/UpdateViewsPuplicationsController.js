"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateViewsPuplicationsController = void 0;
const UpdateViewsPuplicationsService_1 = require("../../services/marketing_publication/UpdateViewsPuplicationsService");
class UpdateViewsPuplicationsController {
    async handle(req, res) {
        const { marketingPublication_id } = req.params;
        const service = new UpdateViewsPuplicationsService_1.UpdateViewsPuplicationsService();
        try {
            const updatePublications = await service.execute({ marketingPublication_id, req });
            return res.json(updatePublications);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.UpdateViewsPuplicationsController = UpdateViewsPuplicationsController;
//# sourceMappingURL=UpdateViewsPuplicationsController.js.map