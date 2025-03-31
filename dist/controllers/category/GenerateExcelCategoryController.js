"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExcelCategoryController = void 0;
const GenerateExcelCategoryService_1 = require("../../services/category/GenerateExcelCategoryService");
class GenerateExcelCategoryController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        try {
            const generateExcelService = new GenerateExcelCategoryService_1.GenerateExcelCategoryService();
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
exports.GenerateExcelCategoryController = GenerateExcelCategoryController;
//# sourceMappingURL=GenerateExcelCategoryController.js.map