"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeletePostsController = void 0;
const GenerateExcelDeletePostsService_1 = require("../../services/post/GenerateExcelDeletePostsService");
class GenerateExcelDeletePostsController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelDeletePostsService_1.GenerateExcelDeletePostsService();
            const workbook = await generateExcelService.execute({ user_id });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=modelo_de dados.xlsx");
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao gerar o arquivo Excel." });
        }
    }
}
exports.GenerateExcelDeletePostsController = GenerateExcelDeletePostsController;
//# sourceMappingURL=GenerateExcelDeletePostsController.js.map