<<<<<<< HEAD
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

=======
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

>>>>>>> a1dcb2e4d383c73addf2ba89ceb9697537099208
export { CategoriesBlogController };