import { decodeJWT, JWT_COOKIE_NAME } from '../jwt/jwt';
import { Request, Response } from 'express';

export function guard(req: Request, res: Response, next: Function) {
  const token = req.cookies[JWT_COOKIE_NAME];

  decodeJWT(token)
    .then((payload: any) => {
      const { error, data } = payload;

      if (error) {
        console.error(error);
        res.sendStatus(401);
        return;
      }

      (req as any).$user = data;

      next();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(401);
      return;
    });
};