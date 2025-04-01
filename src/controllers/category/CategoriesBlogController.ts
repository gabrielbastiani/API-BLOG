import { Request, Response } from "express";
import { CategoriesBlogService } from "../../services/category/CategoriesBlogService";

class CategoriesBlogController {
  async handle(req: Request, res: Response) {
    try {
      const categorias_blog = await new CategoriesBlogService().execute();
      return res.json(categorias_blog);
    } catch (error) {
      console.error("Erro no endpoint:", error);
      return res.status(500).json({ error: "Falha ao carregar categorias" });
    }
  }
}

export { CategoriesBlogController };