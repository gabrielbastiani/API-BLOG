"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteTagsService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelDeleteTagsService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Tags");
        worksheet.columns = [
            { header: "Nome", key: "tag_name", width: 80 }
        ];
        const tags = [
            { tag_name: "motor" }
        ];
        tags.forEach((tag) => {
            worksheet.addRow(tag);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar tags gerada com suscesso",
                type: "tag"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelDeleteTagsService = GenerateExcelDeleteTagsService;
//# sourceMappingURL=GenerateExcelDeleteTagsService.js.map