import { Request, Response } from "express";
import { UpdateViewsService } from "../../services/post/UpdateViewsService";

class UpdateViewsController {
    async handle(req: Request, res: Response) {
        const { post_id } = req.params;
        const service = new UpdateViewsService();

        try {
            const result = await service.execute({ post_id, req });
            return res.status(200).json(result);
        } catch (err: any) {
            console.error('Error updating views:', err);
            return res.status(500).json({
                error: err.message || 'Internal server error'
            });
        }
    }
}

export { UpdateViewsController };