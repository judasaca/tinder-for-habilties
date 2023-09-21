import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] as string;

  if (token == null) res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err != null) {
        res.sendStatus(403);
      } else {
        req.body.verified_user = user;
      }
      next();
    },
  );
};

export default authenticateToken;
