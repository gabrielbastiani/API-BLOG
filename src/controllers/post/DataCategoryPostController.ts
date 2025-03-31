import { Request, Response } from "express";
import { DataCategoryPostService } from "../../services/category/DataCategoryPostService"; 

class DataCategoryPostController {
    async handle(req: Request, res: Response) {

        const slug_name_category = req.query.slug_name_category as string;

        const post_content = new DataCategoryPostService();
        const post = await post_content.execute({ slug_name_category });

        return res.json(post);
    }
}

export { DataCategoryPostController };