import { Request, Response } from 'express'
import { UserBlogDetailService } from '../../../services/user/user_blog/UserBlogDetailService'; 

class UserBlogDetailController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const detail_user = new UserBlogDetailService();

        const user = await detail_user.execute({ user_id });

        return res.json(user);

    }
}

export { UserBlogDetailController }