"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteCategoryService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelDeleteCategoryService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Categories");
        worksheet.columns = [
            { header: "Nome", key: "name_category", width: 80 }
        ];
        const categories = [
            { name_category: "Pistões" }
        ];
        categories.forEach((categ) => {
            worksheet.addRow(categ);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar categorias gerada com suscesso",
                type: "category"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelDeleteCategoryService = GenerateExcelDeleteCategoryService;
//# sourceMappingURL=GenerateExcelDeleteCategoryService.js.map