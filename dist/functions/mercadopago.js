"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpCreatePayment = exports.mpCreateCustomer = exports.mpGetCustomer = exports.mp = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mercadopago = require('mercadopago');
mercadopago.configure({ access_token: process.env.MELI_ACCESS_TOKEN });
exports.mp = mercadopago;
const mpGetCustomer = (email) => {
    return mercadopago.customers.search({ qs: { email } });
};
exports.mpGetCustomer = mpGetCustomer;
const mpCreateCustomer = (data) => {
    return mercadopago.customers.create(data);
};
exports.mpCreateCustomer = mpCreateCustomer;
const mpCreatePayment = (data) => {
    return mercadopago.payment.save(data);
};
exports.mpCreatePayment = mpCreatePayment;
