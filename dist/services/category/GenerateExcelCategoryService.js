"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelCategoryService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelCategoryService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Categories");
        worksheet.columns = [
            { header: "Nome da categiria", key: "name_category", width: 80 },
            { header: "Descrição", key: "description", width: 80 },
            { header: "Status", key: "status", width: 80 },
            { header: "Subcategoria?", key: "parentId", width: 80 },
        ];
        const users = [
            { name_category: "Motores", description: "Veja aqui tudo relacionado a motores", status: "Disponivel", parentId: "Insira aqui, o nome da categoria que deseja vincular" }
        ];
        users.forEach((category) => {
            worksheet.addRow(category);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de categorias gerada com suscesso",
                type: "category"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelCategoryService = GenerateExcelCategoryService;
//# sourceMappingURL=GenerateExcelCategoryService.js.map