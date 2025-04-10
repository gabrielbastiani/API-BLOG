"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTwitterImagesController = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AddTwitterImagesController {
    async handle(req, res) {
        const { sEOSettings_id } = req.body;
        const files = req.files;
        try {
            const settings = await prisma_1.default.sEOSettings.findUnique({
                where: { id: sEOSettings_id }
            });
            if (!settings)
                return res.status(404).json({ error: "Configuração não encontrada" });
            const currentImages = settings.twitterImages;
            const newImages = files.map(file => file.filename);
            await prisma_1.default.sEOSettings.update({
                where: { id: sEOSettings_id },
                data: { twitterImages: [...currentImages, ...newImages] }
            });
            return res.json({ newImages });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao adicionar imagens OG" });
        }
    }
}
exports.AddTwitterImagesController = AddTwitterImagesController;
//# sourceMappingURL=AddTwitterImagesController.js.map