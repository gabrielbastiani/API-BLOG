"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Users");
        worksheet.columns = [
            { header: "Nome", key: "name", width: 80 },
            { header: "Email", key: "email", width: 80 },
            { header: "Senha", key: "senha", width: 80 },
            { header: "Role", key: "role", width: 80 },
        ];
        const users = [
            { name: "João Silva", email: "joao.silva@example.com", senha: "admin", role: "EMPLOYEE" },
            { name: "Maria Oliveira", email: "maria.oliveira@example.com", senha: "admin", role: "EMPLOYEE" },
        ];
        users.forEach((user) => {
            worksheet.addRow(user);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de usuarios gerada com suscesso",
                type: "user"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelService = GenerateExcelService;
//# sourceMappingURL=GenerateExcelService.js.map