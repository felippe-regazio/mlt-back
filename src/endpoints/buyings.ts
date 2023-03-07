import { Request, Response } from 'express';
import Buyings from '../database/models/buyings';

module.exports = async function checkout(req: Request, res: Response) {
  const rawBuyings = await Buyings.find({ userId: (req as any)?.$user.id });

  const buyings = rawBuyings?.length && rawBuyings.map((item: any) => {
    return {
      currency_id: item.payment.body.currency_id,
      date_created: item.payment.body.date_created,
      description: item.payment.body.description,
      status: item.payment.body.status,
    }
  });

  res.status(200).json(buyings);
};