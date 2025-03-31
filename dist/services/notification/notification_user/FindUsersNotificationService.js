"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersNotificationService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../../prisma"));
const client_1 = require("@prisma/client");
class FindUsersNotificationService {
    async execute(page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate, user_id) {
        const skip = (page - 1) * limit;
        const whereClause = {
            ...(search ? {
                OR: [
                    { message: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { type: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {}),
            ...(user_id ? { user_id } : {})
        };
        const all_notifications = await prisma_1.default.notificationUser.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
        });
        const total_notifications = await prisma_1.default.notificationUser.count({
            where: whereClause,
        });
        return {
            notifications_user: all_notifications,
            currentPage: page,
            totalPages: Math.ceil(total_notifications / limit),
            totalContacts: total_notifications,
        };
    }
}
exports.FindUsersNotificationService = FindUsersNotificationService;
//# sourceMappingURL=FindUsersNotificationService.js.map