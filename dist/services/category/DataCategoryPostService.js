"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCategoryPostService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DataCategoryPostService {
    async execute({ slug_name_category }) {
        const data_category = await prisma_1.default.category.findFirst({
            where: {
                slug_name_category: slug_name_category
            }
        });
        return data_category;
    }
}
exports.DataCategoryPostService = DataCategoryPostService;
//# sourceMappingURL=DataCategoryPostService.js.map