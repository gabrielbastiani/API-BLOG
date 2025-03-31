"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSeoSettingsService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Caminho absoluto corrigido para a pasta de imagens
const IMAGE_UPLOAD_DIR = path_1.default.join(process.cwd(), 'images'); // Alterado para 'images'
class UpdateSeoSettingsService {
    async execute({ sEOSettings_id, ...updateData }) {
        const currentSettings = await prisma_1.default.sEOSettings.findUnique({
            where: { id: sEOSettings_id }
        });
        if (!currentSettings) {
            throw new Error("Configuração SEO não encontrada");
        }
        // Extrair e validar índices
        const { ogImageIndexes = [], twitterImageIndexes = [], keywordIndexes = [], newKeywords = [], deletedKeywordIndexes = [], ...prismaUpdateData } = updateData;
        // Processar keywords
        const updatedKeywords = this.processKeywords(currentSettings.keywords || [], newKeywords || [], keywordIndexes, deletedKeywordIndexes);
        // Processar exclusões primeiro
        await this.processDeletions(currentSettings.ogImages, ogImageIndexes, 'OG');
        await this.processDeletions(currentSettings.twitterImages, twitterImageIndexes, 'Twitter');
        // Processar novas imagens
        const updatedOgImages = this.processNewImages(currentSettings.ogImages, updateData.ogImages || [], ogImageIndexes);
        const updatedTwitterImages = this.processNewImages(currentSettings.twitterImages, updateData.twitterImages || [], twitterImageIndexes);
        // Montar dados para atualização
        const dataToUpdate = {
            ...prismaUpdateData,
            keywords: updatedKeywords,
            ogImages: updatedOgImages,
            twitterImages: updatedTwitterImages,
            ogImageWidth: updateData.ogImageWidth ? Number(updateData.ogImageWidth) : undefined,
            ogImageHeight: updateData.ogImageHeight ? Number(updateData.ogImageHeight) : undefined,
        };
        return await prisma_1.default.sEOSettings.update({
            where: { id: sEOSettings_id },
            data: dataToUpdate
        });
    }
    processKeywords(currentKeywords, newKeywords, indexes, deletedIndexes = []) {
        const afterDeletion = currentKeywords.filter((_, index) => !deletedIndexes.includes(index));
        const updatedKeywords = [...afterDeletion];
        const validIndexes = this.validateIndexes(updatedKeywords, indexes);
        if (newKeywords.length > validIndexes.length) {
            throw new Error(`${newKeywords.length} novas keywords para ${validIndexes.length} índices`);
        }
        newKeywords.forEach((keyword, i) => {
            const targetIndex = validIndexes[i] ?? updatedKeywords.length;
            if (targetIndex < updatedKeywords.length) {
                updatedKeywords[targetIndex] = keyword;
            }
            else {
                updatedKeywords.push(keyword);
            }
        });
        return updatedKeywords;
    }
    async processDeletions(currentImages, indexes, type) {
        const validIndexes = this.validateIndexes(currentImages, indexes);
        await Promise.all(validIndexes.map(async (index) => {
            const filename = currentImages[index];
            if (filename) {
                try {
                    const imagePath = path_1.default.join(IMAGE_UPLOAD_DIR, filename);
                    await promises_1.default.access(imagePath);
                    await promises_1.default.unlink(imagePath);
                }
                catch (error) {
                    if (error.code === 'ENOENT') {
                        console.log(`[${type}] ! Arquivo ${filename} não encontrado`);
                    }
                    else {
                        console.error(`[${type}] ✗ Erro ao deletar ${filename}:`, error);
                        throw new Error(`Falha ao deletar imagem: ${filename}`);
                    }
                }
            }
        }));
    }
    processNewImages(currentImages, newImages, indexes) {
        const updatedImages = [...currentImages];
        const validIndexes = this.validateIndexes(currentImages, indexes);
        if (newImages.length > validIndexes.length) {
            throw new Error(`${newImages.length} novas imagens para ${validIndexes.length} índices`);
        }
        newImages.forEach((image, i) => {
            const targetIndex = validIndexes[i] ?? updatedImages.length;
            if (targetIndex < updatedImages.length) {
                updatedImages[targetIndex] = image;
            }
            else {
                updatedImages.push(image);
            }
        });
        return updatedImages;
    }
    validateIndexes(currentImages, indexes) {
        return indexes
            .filter(index => Number.isInteger(index) &&
            index >= 0 &&
            index < currentImages.length)
            .filter((value, index, self) => self.indexOf(value) === index);
    }
}
exports.UpdateSeoSettingsService = UpdateSeoSettingsService;
//# sourceMappingURL=UpdateSeoSettingsService.js.map