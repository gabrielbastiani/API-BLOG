"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelDeleteCategoryController = void 0;
const GenerateExcelDeleteCategoryService_1 = require("../../services/category/GenerateExcelDeleteCategoryService");
class GenerateExcelDeleteCategoryController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelDeleteCategoryService_1.GenerateExcelDeleteCategoryService();
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
exports.GenerateExcelDeleteCategoryController = GenerateExcelDeleteCategoryController;
//# sourceMappingURL=GenerateExcelDeleteCategoryController.js.map