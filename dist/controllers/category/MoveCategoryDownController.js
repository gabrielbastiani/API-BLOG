"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategoryDownController = void 0;
const MoveCategoryDownService_1 = require("../../services/category/MoveCategoryDownService");
class MoveCategoryDownController {
    async handle(req, res) {
        const { categoryId } = req.body;
        const service = new MoveCategoryDownService_1.MoveCategoryDownService();
        try {
            await service.moveCategoryDown(categoryId);
            return res.status(200).json({ message: "Categoria movida para baixo com sucesso" });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao mover a categoria para baixo" });
        }
    }
}
exports.MoveCategoryDownController = MoveCategoryDownController;
//# sourceMappingURL=MoveCategoryDownController.js.map