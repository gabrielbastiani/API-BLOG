"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class CategoriesService {
    async execute() {
        async function fetchChildren(parentId) {
            const categories = await prisma_1.default.category.findMany({
                where: { parentId },
                orderBy: { order: "asc" },
                include: {
                    children: {
                        orderBy: { order: "asc" },
                    },
                },
            });
            for (const category of categories) {
                if (category.children.length > 0) {
                    category.children = await fetchChildren(category.id);
                }
            }
            return categories;
        }
        const rootCategories = await fetchChildren(null);
        const all_categories_disponivel = await prisma_1.default.category.findMany({
            where: {
                status: client_1.StatusCategory.Disponivel
            },
        });
        const data = {
            rootCategories,
            all_categories_disponivel
        };
        return data;
    }
}
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=CategoriesService.js.map