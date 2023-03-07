import * as dotenv from 'dotenv';
dotenv.config();

const mercadopago = require('mercadopago');
mercadopago.configure({ access_token: process.env.MELI_ACCESS_TOKEN });

export const mp = mercadopago;

export const mpGetCustomer = (email: string) => {
  return mercadopago.customers.search({ qs: { email } })
}

export const mpCreateCustomer = (data: object) => {
  return mercadopago.customers.create(data);
}

export const mpCreatePayment = (data: object) => {  
  return mercadopago.payment.save(data);
}
