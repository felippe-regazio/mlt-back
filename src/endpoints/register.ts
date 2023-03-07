import { hashPassword } from '../functions';
import { Request, Response } from 'express';
import Credentials from '../database/models/credentials';

module.exports = async function register(req: Request, res: Response) {
  const data = req.body;
  const emailAlreadyTaken = await Credentials.findOne({ email: data.email });

  if (emailAlreadyTaken) {
    res.status(401).json({ 
      success: false, 
      errorMessage: 'Não foi possível efetuar o cadastro: Este usuário já existe.', 
    });

    return false;
  }

  if (data.password !== data['confirm-password']) {
    res.status(401).json({ 
      success: false, 
      errorMessage: 'As senhas digitadas não conferem. Ambas devem ser iguais.', 
    });    

    return false;
  };

  data.password = await hashPassword(data.password);

  Credentials.findOneAndUpdate({ email: data.email }, data, { upsert: true })
    .then(() => {
      res.status(200).json({
        success: true, 
        errorMessage: null, 
      })
    })
    .catch(error => {
      console.error(error);

      res.status(500).json({ 
        success: false, 
        errorMessage: 'Um erro inesperado ocorreu', 
      })
    });
}
