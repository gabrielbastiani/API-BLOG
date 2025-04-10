"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesBlogController = void 0;
const CategoriesBlogService_1 = require("../../services/category/CategoriesBlogService");
class CategoriesBlogController {
    async handle(req, res) {
        try {
            const categorias_blog = await new CategoriesBlogService_1.CategoriesBlogService().execute();
            return res.json(categorias_blog);
        }
        catch (error) {
            console.error("Erro no endpoint:", error);
            return res.status(500).json({ error: "Falha ao carregar categorias" });
        }
    }
}
exports.CategoriesBlogController = CategoriesBlogController;
//# sourceMappingURL=CategoriesBlogController.js.map