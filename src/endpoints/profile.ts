import { decodeJWT, JWT_COOKIE_NAME } from '../jwt/jwt';
import { Request, Response } from 'express';

module.exports = function profile(req: Request, res: Response) {
  const token = req.cookies[JWT_COOKIE_NAME];

  decodeJWT(token)
    .then((payload: any) => {
      const { error, data } = payload;
      error && console.error(error);

      res
        .status(200)
        .json(data);
    })
    .catch(console.error);
};