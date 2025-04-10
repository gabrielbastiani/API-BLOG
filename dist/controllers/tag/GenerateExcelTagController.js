"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelTagController = void 0;
const GenerateExcelTagService_1 = require("../../services/tag/GenerateExcelTagService");
class GenerateExcelTagController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelTagService_1.GenerateExcelTagService();
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
exports.GenerateExcelTagController = GenerateExcelTagController;
//# sourceMappingURL=GenerateExcelTagController.js.map