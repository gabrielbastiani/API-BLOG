import { Request, Response } from 'express';
import { CacheService } from '../../../services/configuration_blog/cache_images/CacheService';

class CacheController {
    async handle(req: Request, res: Response) {
        // Verificação de segurança
        const authHeader = req.headers.authorization;

        if (!authHeader || authHeader.trim() !== `Bearer ${process.env.ADMIN_SECRET?.trim()}`) {
            return res.status(403).json({ success: false, message: 'Acesso não autorizado' });
        }

        try {
            const cacheService = new CacheService();
            const result = await cacheService.purgeCloudflareCache();

            return res.status(result.success ? 200 : 400).json(result);

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }
}

export { CacheController };