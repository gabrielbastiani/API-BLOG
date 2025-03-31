"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllTagsService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class AllTagsService {
    async execute(page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate) {
        const skip = (page - 1) * limit;
        const whereClause = {
            ...(search ? {
                OR: [
                    { tag_name: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } }
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {})
        };
        const all_tags = await prisma_1.default.tag.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });
        const total_tags = await prisma_1.default.tag.count({
            where: whereClause,
        });
        // -- TODAS TAGS -- //
        const tags_all = await prisma_1.default.tag.findMany();
        return {
            tags_all: tags_all,
            tags: all_tags,
            currentPage: page,
            totalPages: Math.ceil(total_tags / limit),
            totalTags: total_tags,
        };
    }
}
exports.AllTagsService = AllTagsService;
//# sourceMappingURL=AllTagsService.js.map