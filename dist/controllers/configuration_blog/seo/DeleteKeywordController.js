"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteKeywordController = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteKeywordController {
    async handle(req, res) {
        const { sEOSettings_id, keywordIndex } = req.body;
        try {
            const settings = await prisma_1.default.sEOSettings.findUnique({
                where: { id: sEOSettings_id }
            });
            if (!settings) {
                return res.status(404).json({ error: "Configuração SEO não encontrada" });
            }
            const keywords = settings.keywords;
            keywords.splice(keywordIndex, 1); // Remove a keyword pelo índice
            await prisma_1.default.sEOSettings.update({
                where: { id: sEOSettings_id },
                data: { keywords }
            });
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao deletar palavra-chave" });
        }
    }
}
exports.DeleteKeywordController = DeleteKeywordController;
//# sourceMappingURL=DeleteKeywordController.js.map