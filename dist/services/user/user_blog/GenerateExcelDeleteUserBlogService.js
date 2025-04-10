"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteUserBlogService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../../prisma"));
class GenerateExcelDeleteUserBlogService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("UsersBlog");
        worksheet.columns = [
            { header: "Email", key: "email", width: 80 }
        ];
        const users = [
            { email: "joao.silva@example.com" }
        ];
        users.forEach((user) => {
            worksheet.addRow(user);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar usuarios do blog gerada com suscesso",
                type: "user"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelDeleteUserBlogService = GenerateExcelDeleteUserBlogService;
//# sourceMappingURL=GenerateExcelDeleteUserBlogService.js.map