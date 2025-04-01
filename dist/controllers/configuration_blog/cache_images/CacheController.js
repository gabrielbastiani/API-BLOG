"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
const CacheService_1 = require("../../../services/configuration_blog/cache_images/CacheService");
class CacheController {
    async handle(req, res) {
        // Verificação de segurança
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader.trim() !== `Bearer ${process.env.ADMIN_SECRET?.trim()}`) {
            return res.status(403).json({ success: false, message: 'Acesso não autorizado' });
        }
        try {
            const cacheService = new CacheService_1.CacheService();
            const result = await cacheService.purgeCloudflareCache();
            return res.status(result.success ? 200 : 400).json(result);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro interno no servidor'
            });
        }
    }
}
exports.CacheController = CacheController;
//# sourceMappingURL=CacheController.js.map