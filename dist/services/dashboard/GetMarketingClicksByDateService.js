"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMarketingClicksByDateService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
class GetMarketingClicksByDateService {
    async execute(startDate, endDate) {
        const publicationClicksRaw = await prisma_1.default.marketingPublicationView.findMany({
            where: {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString()
                },
            },
            select: {
                marketingPublication_id: true,
                created_at: true,
                marketingPublication: { select: { title: true } }, // Busca o título da publicidade
            },
        });
        const formattedData = [];
        const clickMap = {}; // Para armazenar os dados temporariamente
        publicationClicksRaw.forEach(({ created_at, marketingPublication }) => {
            const date = created_at.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
            if (!clickMap[date])
                clickMap[date] = {}; /* @ts-ignore */
            if (!clickMap[date][marketingPublication.title])
                clickMap[date][marketingPublication.title] = 0; // Inicializa o contador de clicks
            /* @ts-ignore */
            clickMap[date][marketingPublication.title] += 1; // Incrementa o contador de clicks
        });
        // Converte os dados para o formato final
        Object.entries(clickMap).forEach(([date, marketingpublications]) => {
            Object.entries(marketingpublications).forEach(([title, clicks]) => {
                formattedData.push({ date, title, clicks });
            });
        });
        return formattedData;
    }
}
exports.GetMarketingClicksByDateService = GetMarketingClicksByDateService;
//# sourceMappingURL=GetMarketingClicksByDateService.js.map