"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeletePostsService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelDeletePostsService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Posts");
        worksheet.columns = [
            { header: "ID", key: "id", width: 80 }
        ];
        const posts = [
            { id: "99ad8924-7df7-4750-bc8e-268cece5e124" }
        ];
        posts.forEach((post) => {
            worksheet.addRow(post);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação para deletar posts gerada com suscesso",
                type: "post"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelDeletePostsService = GenerateExcelDeletePostsService;
//# sourceMappingURL=GenerateExcelDeletePostsService.js.map