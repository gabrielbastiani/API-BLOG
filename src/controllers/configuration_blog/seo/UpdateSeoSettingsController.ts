import { Request, Response } from 'express';
import { UpdateSeoSettingsService } from '../../../services/configuration_blog/seo/UpdateSeoSettingsService';
import { z } from 'zod';

const updateSchema = z.object({
    sEOSettings_id: z.string().uuid(),
    page: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImageWidth: z.number().optional(),
    ogImageHeight: z.number().optional(),
    ogImageAlt: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    twitterCreator: z.string().optional(),
    ogImageIndexes: z.string().transform(val => {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        } catch {
            return [];
        }
    }),
    twitterImageIndexes: z.string().transform(val => {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        } catch {
            return [];
        }
    }),
});

class UpdateSeoSettingsController {
    async handle(req: Request, res: Response) {
        try {
            // Validação e transformação
            const validatedData = await updateSchema.parseAsync({
                ...req.body,
                ogImageIndexes: req.body.ogImageIndexes || '[]',
                twitterImageIndexes: req.body.twitterImageIndexes || '[]'
            });

            // Processar uploads
            const ogImages = req.files?.['ogImages']?.map(file => file.filename) || [];
            const twitterImages = req.files?.['twitterImages']?.map(file => file.filename) || [];

            // Validação de quantidade
            if (ogImages.length > validatedData.ogImageIndexes.length) {
                throw new Error('Mais imagens OG do que índices especificados');
            }

            if (twitterImages.length > validatedData.twitterImageIndexes.length) {
                throw new Error('Mais imagens Twitter do que índices especificados');
            }

            // Montar objeto de atualização
            const updatePayload = {
                sEOSettings_id: validatedData.sEOSettings_id,
                page: validatedData.page,
                title: validatedData.title,
                description: validatedData.description,
                keywords: validatedData.keywords ? JSON.parse(validatedData.keywords) : undefined,
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
                twitterImageIndexes: validatedData.twitterImageIndexes
            };

            // Executar atualização
            const updateService = new UpdateSeoSettingsService();
            const result = await updateService.execute(updatePayload);

            return res.json(result);

        } catch (error: any) {
            console.error('Erro na atualização:', error);
            return res.status(400).json({
                error: error.message || 'Erro ao atualizar configurações SEO',
                details: error.issues || []
            });
        }
    }
}

export { UpdateSeoSettingsController }