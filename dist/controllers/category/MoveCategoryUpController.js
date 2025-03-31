"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategoryUpController = void 0;
const MoveCategoryUpService_1 = require("../../services/category/MoveCategoryUpService");
class MoveCategoryUpController {
    async handle(req, res) {
        const { categoryId } = req.body;
        const service = new MoveCategoryUpService_1.MoveCategoryUpService();
        try {
            await service.moveCategoryUp(categoryId);
            return res.status(200).json({ message: "Categoria movida para cima com sucesso" });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao mover a categoria para cima" });
        }
    }
}
exports.MoveCategoryUpController = MoveCategoryUpController;
//# sourceMappingURL=MoveCategoryUpController.js.map