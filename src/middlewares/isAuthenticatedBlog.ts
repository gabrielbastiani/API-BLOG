import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string;
}

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
    }
  }
}

export async function isAuthenticatedBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(
      token,/* @ts-ignore */
      process.env?.JWT_SECRET
    ) as Payload;

    req.user_id = sub;

    return next();

  } catch (err) {
    return res.status(401).end();
  }

}