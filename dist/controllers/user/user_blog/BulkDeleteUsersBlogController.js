"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.BulkDeleteUsersBlogController = void 0;
const BulkDeleteUsersBlogService_1 = require("../../../services/user/user_blog/BulkDeleteUsersBlogService");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'temp_file/' }); // Diretório temporário para arquivos
exports.upload = upload;
class BulkDeleteUsersBlogController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: "Arquivo Excel não fornecido" });
        }
        const service = new BulkDeleteUsersBlogService_1.BulkDeleteUsersBlogService();
        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json({ message: "Usuários deletados com sucesso", result });
        }
        catch (error) { /* @ts-ignore */
            return res.status(500).json({ error: "Erro ao deletar usuários", details: error.message });
        }
    }
}
exports.BulkDeleteUsersBlogController = BulkDeleteUsersBlogController;
//# sourceMappingURL=BulkDeleteUsersBlogController.js.map