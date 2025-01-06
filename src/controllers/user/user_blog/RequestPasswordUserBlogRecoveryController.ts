import { Request, Response } from "express";
import { RequestPasswordUserBlogRecoveryService } from "../../../services/user/user_blog/RequestPasswordUserBlogRecoveryService";  

class RequestPasswordUserBlogRecoveryController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const requestPasswordRecovery = new RequestPasswordUserBlogRecoveryService();

    const user = await requestPasswordRecovery.execute({
      email,
    });

    return res.json(user)
  }
}

export { RequestPasswordUserBlogRecoveryController };