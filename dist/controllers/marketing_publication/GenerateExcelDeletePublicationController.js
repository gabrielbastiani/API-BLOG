"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeletePublicationController = void 0;
const GenerateExcelDeletePublicationService_1 = require("../../services/marketing_publication/GenerateExcelDeletePublicationService");
class GenerateExcelDeletePublicationController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelDeletePublicationService_1.GenerateExcelDeletePublicationService();
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
exports.GenerateExcelDeletePublicationController = GenerateExcelDeletePublicationController;
//# sourceMappingURL=GenerateExcelDeletePublicationController.js.map