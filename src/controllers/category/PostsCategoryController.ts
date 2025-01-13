import { Request, Response } from "express";
import { PostsCategoryService } from "../../services/category/PostsCategoryService";
import { Prisma } from "@prisma/client";

class PostsCategoryController {
  async handle(req: Request, res: Response) {
    const {
      slug_name_category,
      page = 1,
      limit = 6,
      search = "",
      orderBy = "created_at",
      orderDirection = "desc",
    } = req.query;

    if (!slug_name_category) {
      return res.status(400).json({ error: "slug_name_category is required" });
    }

    const allPosts = new PostsCategoryService();
    const posts = await allPosts.execute(
      String(slug_name_category),
      Number(page),
      Number(limit),
      String(search),
      String(orderBy),
      orderDirection as Prisma.SortOrder
    );

    return res.json(posts);
  }
}

export { PostsCategoryController };