"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterFindService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class NewsletterFindService {
    async execute(page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate) {
        const skip = (page - 1) * limit;
        // Construção da cláusula 'where' com filtro de texto e data
        const whereClause = {
            ...(search ? {
                OR: [
                    { email_user: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {})
        };
        const all_newslater = await prisma_1.default.newsletter.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });
        const total_newslatter = await prisma_1.default.newsletter.count({
            where: whereClause,
        });
        return {
            newslatters: all_newslater,
            currentPage: page,
            totalPages: Math.ceil(total_newslatter / limit),
            totalNewslatter: total_newslatter,
        };
    }
}
exports.NewsletterFindService = NewsletterFindService;
//# sourceMappingURL=NewsletterFindService.js.map