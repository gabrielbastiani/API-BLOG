import { Request, Response } from "express";
import { CategoriesBlogService } from "../../services/category/CategoriesBlogService";

class CategoriesBlogController {
  async handle(req: Request, res: Response) {

    const allContacts = new CategoriesBlogService();
    const contacts = await allContacts.execute();

    return res.json(contacts);
  }
}

export { CategoriesBlogController };