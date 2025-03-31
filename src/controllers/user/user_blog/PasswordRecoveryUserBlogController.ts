import { Request, Response } from "express";
import { PasswordRecoveryUserBlogSevice } from "../../../services/user/user_blog/PasswordRecoveryUserBlogSevice"; 

class PasswordRecoveryUserBlogController {
  async handle(req: Request, res: Response) {
    const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id as string;

    const { password } = req.body;

    const passwordRecovery = new PasswordRecoveryUserBlogSevice();

    const recoveryPassword = await passwordRecovery.execute({
      passwordRecoveryUser_id,
      password,
    });

    return res.json(recoveryPassword)
  }

}

export { PasswordRecoveryUserBlogController };