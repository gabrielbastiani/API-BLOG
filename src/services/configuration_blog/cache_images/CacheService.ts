class CacheService {
    async purgeCloudflareCache() {
        try {
            const response = await fetch(
                `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        purge_everything: true
                    }),
                }
            );

            const data = await response.json() as CloudflareApiResponse;

            return {
                success: data.success,
                message: data.success
                    ? 'Cache purgado com sucesso'
                    : data.errors[0].message
            };

        } catch (error) {
            console.error('Erro na purga de cache:', error);
            return {
                success: false,
                message: 'Erro interno no servidor'
            };
        }
    }
}

export { CacheService };

interface CloudflareApiResponse {
    success: boolean;
    errors: Array<{ code: number; message: string }>;
}