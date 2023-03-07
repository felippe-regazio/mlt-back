import { Request, Response } from 'express';
import Buyings from '../database/models/buyings';
import { mpGetCustomer, mpCreateCustomer, mpCreatePayment } from '../functions/mercadopago';

module.exports = async function checkout(req: Request, res: Response) {
  try {
    let payment;
    const data: any = req.body;
    const queryCustomer = await mpGetCustomer(data.payer.email);
    
    queryCustomer?.body?.results[0] || await mpCreateCustomer({
      "email": data.payer.email,
      "description": "Novo usuario para o teste MELI",
      "default_card": "None"
    });

    try {
      payment = await mpCreatePayment(data);

      new Buyings({
        payment: payment,
        userId: (req as any).$user.id     
      }).save();

      res
        .status(payment.status)
        .json({ status: payment.status });
    } catch(error: any) {
      console.error(error);

      res
        .status(error.status)
        .json({ status: error.status, error: true, message: error.message });      
    }

  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro inesperado' });
  }
}
