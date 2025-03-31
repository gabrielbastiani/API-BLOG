"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelPostsService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = __importDefault(require("../../prisma"));
class GenerateExcelPostsService {
    async execute({ user_id }) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Posts");
        worksheet.columns = [
            { header: "Autor", key: "author", width: 80 },
            { header: "Titulo do post", key: "title", width: 80 },
            { header: "Status", key: "status", width: 80 },
            { header: "Publicação programada", key: "publish_at", width: 80 },
            { header: "Tags do post", key: "tags", width: 80 },
            { header: "Categorias do post", key: "categories", width: 80 }
        ];
        const posts = [
            {
                author: "Aqui insira seu nome, ou algum nome de forma exata como esta no cadastro",
                title: "Como funciona um motor?",
                status: "Indisponivel",
                publish_at: "01/01/2033 01:00",
                categories: `6eac8901-8a2b-49a7-aea9-abfcde426e84, ca7e14db-b5bb-4d17-accf-62c059105b52`,
                tags: `273c1d02-03b3-4085-ac40-d9da142b9a00, ba95c0b0-7720-4aea-b3f2-0b392609e898`,
            }
        ];
        posts.forEach((post) => {
            worksheet.addRow(post);
        });
        await prisma_1.default.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de posts gerada com suscesso",
                type: "post"
            }
        });
        return workbook;
    }
}
exports.GenerateExcelPostsService = GenerateExcelPostsService;
//# sourceMappingURL=GenerateExcelPostsService.js.map