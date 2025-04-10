"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSeoSettingsController = void 0;
const UpdateSeoSettingsService_1 = require("../../../services/configuration_blog/seo/UpdateSeoSettingsService");
const zod_1 = require("zod");
const updateSchema = zod_1.z.object({
    sEOSettings_id: zod_1.z.string().uuid(),
    page: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    keywords: zod_1.z.string().optional(),
    keywordIndexes: zod_1.z.string().transform(val => {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        }
        catch {
            return [];
        }
    }),
    newKeywords: zod_1.z.string().transform(val => {
        try {
            return JSON.parse(val);
        }
        catch {
            return [];
        }
    }),
    ogTitle: zod_1.z.string().optional(),
    ogDescription: zod_1.z.string().optional(),
    ogImageWidth: zod_1.z.coerce.number().optional(),
    ogImageHeight: zod_1.z.coerce.number().optional(),
    ogImageAlt: zod_1.z.string().optional(),
    twitterTitle: zod_1.z.string().optional(),
    twitterDescription: zod_1.z.string().optional(),
    twitterCreator: zod_1.z.string().optional(),
    ogImageIndexes: zod_1.z.string().transform(val => {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        }
        catch {
            return [];
        }
    }),
    twitterImageIndexes: zod_1.z.string().transform(val => {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        }
        catch {
            return [];
        }
    }),
});
class UpdateSeoSettingsController {
    async handle(req, res) {
        try {
            const validatedData = await updateSchema.parseAsync({
                ...req.body,
                ogImageIndexes: req.body.ogImageIndexes || '[]',
                twitterImageIndexes: req.body.twitterImageIndexes || '[]',
                keywordIndexes: req.body.keywordIndexes || '[]',
                newKeywords: req.body.newKeywords || '[]'
            });
            // Processar uploads
            /* @ts-ignore */
            const ogImages = req.files?.['ogImages']?.map(file => file.filename) || []; /* @ts-ignore */
            const twitterImages = req.files?.['twitterImages']?.map(file => file.filename) || [];
            // Validações
            if (ogImages.length > validatedData.ogImageIndexes.length) {
                throw new Error('Mais imagens OG do que índices especificados');
            }
            if (twitterImages.length > validatedData.twitterImageIndexes.length) {
                throw new Error('Mais imagens Twitter do que índices especificados');
            }
            if (validatedData.newKeywords.length > validatedData.keywordIndexes.length) {
                throw new Error('Mais keywords do que índices especificados');
            }
            // Montar payload
            const updatePayload = {
                sEOSettings_id: validatedData.sEOSettings_id,
                page: validatedData.page,
                title: validatedData.title,
                description: validatedData.description,
                ogTitle: validatedData.ogTitle,
                ogDescription: validatedData.ogDescription,
                ogImageWidth: validatedData.ogImageWidth,
                ogImageHeight: validatedData.ogImageHeight,
                ogImageAlt: validatedData.ogImageAlt,
                twitterTitle: validatedData.twitterTitle,
                twitterDescription: validatedData.twitterDescription,
                twitterCreator: validatedData.twitterCreator,
                ogImages,
                ogImageIndexes: validatedData.ogImageIndexes,
                twitterImages,
                twitterImageIndexes: validatedData.twitterImageIndexes,
                keywordIndexes: validatedData.keywordIndexes,
                newKeywords: validatedData.newKeywords
            };
            const updateService = new UpdateSeoSettingsService_1.UpdateSeoSettingsService();
            const result = await updateService.execute(updatePayload);
            return res.json(result);
        }
        catch (error) {
            console.error('Erro na atualização:', error);
            return res.status(400).json({
                error: error.message || 'Erro ao atualizar configurações SEO',
                details: error.issues || []
            });
        }
    }
}
exports.UpdateSeoSettingsController = UpdateSeoSettingsController;
//# sourceMappingURL=UpdateSeoSettingsController.js.map