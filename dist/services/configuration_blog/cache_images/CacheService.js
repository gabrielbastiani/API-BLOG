"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
class CacheService {
    async purgeCloudflareCache() {
        try {
            const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    purge_everything: true
                }),
            });
            const data = await response.json();
            return {
                success: data.success,
                message: data.success
                    ? 'Cache purgado com sucesso'
                    : data.errors[0].message
            };
        }
        catch (error) {
            console.error('Erro na purga de cache:', error);
            return {
                success: false,
                message: 'Erro interno no servidor'
            };
        }
    }
}
exports.CacheService = CacheService;
//# sourceMappingURL=CacheService.js.map