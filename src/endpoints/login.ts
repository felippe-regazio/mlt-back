import { Request, Response } from 'express';
import { comparePassword } from '../functions';
import { encodeJWT, JWT_COOKIE_NAME } from '../jwt/jwt';
import Credentials from '../database/models/credentials';

module.exports = async function login(req: Request, res: Response) {
  const data = req.body;
  const user = await Credentials.findOne({ email: data.email }).select('+password');
  const passok = user && await comparePassword(data.password, user?.password || '');
  
  if (!user || !passok) {
    res.status(401).json({ 
      success: false, 
      errorMessage: 'Usuário inexistente ou senha inválida.', 
    });

    return false;
  }

  if (user && passok) {
    const userData = user?.toObject() || {};
    delete userData.password;
    const token = encodeJWT(userData);
  
    res
      .cookie(JWT_COOKIE_NAME, token, { maxAge: 900000000 })
      .status(200)
      .json({ success: true });
  }
}
