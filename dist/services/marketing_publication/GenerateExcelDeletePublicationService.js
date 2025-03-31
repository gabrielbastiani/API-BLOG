"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeletePublicationService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelDeletePublicationService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("MarketingPublication");
        worksheet.columns = [
            { header: "Nome", key: "title", width: 80 }
        ];
        const publications = [
            { title: "Publicidade no banner home" }
        ];
        publications.forEach((publi) => {
            worksheet.addRow(publi);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar as publicações de marketing gerada com suscesso",
                type: "marketing"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelDeletePublicationService = GenerateExcelDeletePublicationService;
//# sourceMappingURL=GenerateExcelDeletePublicationService.js.map