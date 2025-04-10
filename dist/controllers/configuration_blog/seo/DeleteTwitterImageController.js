"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTwitterImageController = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const IMAGE_UPLOAD_DIR = path_1.default.join(process.cwd(), 'images');
class DeleteTwitterImageController {
    async handle(req, res) {
        const { sEOSettings_id, imageIndex } = req.body;
        try {
            const settings = await prisma_1.default.sEOSettings.findUnique({
                where: { id: sEOSettings_id }
            });
            if (!settings)
                return res.status(404).json({ error: "Configuração não encontrada" });
            const images = settings.twitterImages;
            const imageToDelete = images[imageIndex];
            if (!imageToDelete)
                return res.status(404).json({ error: "Imagem não encontrada" });
            // Deletar arquivo físico
            await promises_1.default.unlink(path_1.default.join(IMAGE_UPLOAD_DIR, imageToDelete));
            // Atualizar banco
            const updatedImages = images.filter((_, i) => i !== imageIndex);
            await prisma_1.default.sEOSettings.update({
                where: { id: sEOSettings_id },
                data: { twitterImages: updatedImages }
            });
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao remover imagem OG" });
        }
    }
}
exports.DeleteTwitterImageController = DeleteTwitterImageController;
//# sourceMappingURL=DeleteTwitterImageController.js.map