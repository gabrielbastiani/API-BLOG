"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCategoryStatisticsService {
    async execute() {
        const totalCategories = await prisma_1.default.category.count();
        // Agrupando categorias por parentId
        const subcategories = await prisma_1.default.category.groupBy({
            by: ['parentId'],
            _count: { id: true },
        });
        // Buscando os nomes das categorias associadas aos parentIds
        const parentCategories = await prisma_1.default.category.findMany({
            where: {
                id: {
                    in: subcategories.map(sub => sub.parentId).filter(id => id !== null),
                },
            },
            select: {
                id: true,
                name_category: true,
            },
        });
        // Mapeando para incluir os nomes das categorias no retorno
        const subcategoriesWithNames = subcategories.map(sub => {
            const parentCategory = parentCategories.find(cat => cat.id === sub.parentId);
            return {
                ...sub,
                parentName: parentCategory ? parentCategory.name_category : 'Sem subcategoria',
            };
        });
        return { totalCategories, subcategories: subcategoriesWithNames };
    }
}
exports.GetCategoryStatisticsService = GetCategoryStatisticsService;
//# sourceMappingURL=GetCategoryStatisticsService.js.map