"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteUserBlogController = void 0;
const GenerateExcelDeleteUserBlogService_1 = require("../../../services/user/user_blog/GenerateExcelDeleteUserBlogService");
class GenerateExcelDeleteUserBlogController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelDeleteUserBlogService_1.GenerateExcelDeleteUserBlogService();
            const workbook = await generateExcelService.execute({ user_id });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=modelo_de_dados.xlsx");
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao gerar o arquivo Excel." });
        }
    }
}
exports.GenerateExcelDeleteUserBlogController = GenerateExcelDeleteUserBlogController;
//# sourceMappingURL=GenerateExcelDeleteUserBlogController.js.map