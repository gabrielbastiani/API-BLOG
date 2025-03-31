import { Request, Response } from "express";
import { SearchPostBlogService } from "../../services/post/SearchPostBlogService";
import { Prisma } from "@prisma/client";/* @ts-ignore */
import { validate as isUUID } from 'uuid'; // Importando a função de validação

class SearchPostBlogController {
    async handle(req: Request, res: Response) {
        const {
            post_id,
            page = 1,
            limit = 6,
            search = "",
            orderBy = "created_at",
            orderDirection = "desc"
        } = req.query;

        // Validar o post_id se for passado
        if (post_id && !isUUID(post_id as string)) {
            return res.status(400).json({ error: "Invalid post_id format" });
        }

        const allPosts = new SearchPostBlogService();
        const posts = await allPosts.execute(
            post_id ? String(post_id) : undefined, // Passando post_id apenas se for válido
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder
        );

        return res.json(posts);
    }
}

export { SearchPostBlogController };