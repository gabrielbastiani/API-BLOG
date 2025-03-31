"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDataController = void 0;
const ExportDataService_1 = require("../../services/export_data/ExportDataService");
class ExportDataController {
    async handle(req, res) {
        const { user_id, tableName, columns, format, customColumnNames } = req.body;
        if (!Array.isArray(columns) || columns.some(col => typeof col !== 'string')) {
            return res.status(400).json({ error: "Parâmetro columns deve ser um array de strings" });
        }
        if (typeof customColumnNames !== 'object' || customColumnNames === null) {
            return res.status(400).json({ error: "Parâmetro customColumnNames deve ser um objeto" });
        }
        const exportDataService = new ExportDataService_1.ExportDataService();
        try {
            const { buffer, mimeType, extension } = await exportDataService.execute(user_id, tableName, columns, format, customColumnNames);
            res.setHeader('Content-Disposition', `attachment; filename=data_export.${extension}`);
            res.setHeader('Content-Type', mimeType);
            return res.send(buffer);
        }
        catch (error) { /* @ts-ignore */
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ExportDataController = ExportDataController;
//# sourceMappingURL=ExportDataController.js.map