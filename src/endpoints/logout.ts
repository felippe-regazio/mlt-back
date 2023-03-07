import { Request, Response } from 'express';
import { JWT_COOKIE_NAME } from '../jwt/jwt';

module.exports = async function logout(_req: Request, res: Response) {
  res
    .cookie(JWT_COOKIE_NAME, 'LogOut', { maxAge: 0 })
    .status(200)
    .json({ success: true });
}
