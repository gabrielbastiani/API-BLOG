"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteTagController = void 0;
const GenerateExcelDeleteTagsService_1 = require("../../services/tag/GenerateExcelDeleteTagsService");
class GenerateExcelDeleteTagController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelDeleteTagsService_1.GenerateExcelDeleteTagsService();
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
exports.GenerateExcelDeleteTagController = GenerateExcelDeleteTagController;
//# sourceMappingURL=GenerateExcelDeleteTagController.js.map