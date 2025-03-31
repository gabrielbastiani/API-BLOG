"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.BulkDeleteCategoryController = void 0;
const BulkDeleteCategoryService_1 = require("../../services/category/BulkDeleteCategoryService");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'temp_file/' }); // Diretório temporário para arquivos
exports.upload = upload;
class BulkDeleteCategoryController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }
        const service = new BulkDeleteCategoryService_1.BulkDeleteCategoryService();
        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Categorias deletados com sucesso", result });
        }
        catch (error) { /* @ts-ignore */
            return res.status(500).json({ error: "Erro ao deletar categorias", details: error?.message });
        }
    }
}
exports.BulkDeleteCategoryController = BulkDeleteCategoryController;
//# sourceMappingURL=BulkDeleteCategoryController.js.map