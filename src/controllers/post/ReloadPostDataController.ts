import { Request, Response } from "express";
import { ReloadPostDataService } from "../../services/post/ReloadPostDataService";

class ReloadPostDataController {
    async handle(req: Request, res: Response) {
        const post_id = req.query.post_id as string;

        const post_content = new ReloadPostDataService();
        const post = await post_content.execute({ post_id });

        return res.json(post);
    }
}

export { ReloadPostDataController };