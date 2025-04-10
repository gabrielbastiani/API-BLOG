"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsersService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class AllUsersService {
    async execute(page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate, user_id) {
        const skip = (page - 1) * limit;
        const whereClause = {
            ...(search ? {
                OR: [
                    { name: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { email: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {}),
            role: { in: ["ADMIN", "EMPLOYEE"] },
            id: { not: user_id }
        };
        const all_users = await prisma_1.default.user.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });
        const total_users = await prisma_1.default.user.count({
            where: whereClause,
        });
        // -- ALL USERS --
        const autor = await prisma_1.default.user.findMany({
            where: {
                status: "Disponivel"
            },
            select: {
                name: true
            }
        });
        return {
            all_autor: autor,
            users: all_users,
            currentPage: page,
            totalPages: Math.ceil(total_users / limit),
            totalUsers: total_users,
        };
    }
}
exports.AllUsersService = AllUsersService;
//# sourceMappingURL=AllUsersService.js.map