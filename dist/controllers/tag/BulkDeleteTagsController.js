"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.BulkDeleteTagsController = void 0;
const BulkDeleteTagsService_1 = require("../../services/tag/BulkDeleteTagsService");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'temp_file/' });
exports.upload = upload;
class BulkDeleteTagsController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }
        const service = new BulkDeleteTagsService_1.BulkDeleteTagsService();
        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Tags deletadas com sucesso", result });
        }
        catch (error) { /* @ts-ignore */
            return res.status(500).json({ error: "Erro ao deletar tags", details: error.message });
        }
    }
}
exports.BulkDeleteTagsController = BulkDeleteTagsController;
//# sourceMappingURL=BulkDeleteTagsController.js.map