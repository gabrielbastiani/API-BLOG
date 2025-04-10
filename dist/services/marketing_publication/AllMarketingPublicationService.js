"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMarketingPublicationService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class AllMarketingPublicationService {
    async execute(marketing_publication_id, page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate) {
        const skip = (page - 1) * limit;
        // Construção da cláusula 'where' com filtro de texto e data
        const whereClause = {
            ...(search ? {
                OR: [
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { description: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } }
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {})
        };
        const all_publications = await prisma_1.default.marketingPublication.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection }
        });
        const total_publications = await prisma_1.default.marketingPublication.count({
            where: whereClause,
        });
        // --- UNIQUE Publication ---//
        let marketing_content_unique = null;
        if (marketing_publication_id) {
            marketing_content_unique = await prisma_1.default.marketingPublication.findUnique({
                where: {
                    id: marketing_publication_id,
                }
            });
        }
        return {
            unique_marketing_content: marketing_content_unique,
            publications: all_publications,
            currentPage: page,
            totalPages: Math.ceil(total_publications / limit),
            totalPublications: total_publications
        };
    }
}
exports.AllMarketingPublicationService = AllMarketingPublicationService;
//# sourceMappingURL=AllMarketingPublicationService.js.map