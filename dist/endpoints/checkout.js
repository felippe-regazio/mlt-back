"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buyings_1 = __importDefault(require("../database/models/buyings"));
const mercadopago_1 = require("../functions/mercadopago");
module.exports = function checkout(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let payment;
            const data = req.body;
            const queryCustomer = yield (0, mercadopago_1.mpGetCustomer)(data.payer.email);
            ((_a = queryCustomer === null || queryCustomer === void 0 ? void 0 : queryCustomer.body) === null || _a === void 0 ? void 0 : _a.results[0]) || (yield (0, mercadopago_1.mpCreateCustomer)({
                "email": data.payer.email,
                "description": "Novo usuario para o teste MELI",
                "default_card": "None"
            }));
            try {
                payment = yield (0, mercadopago_1.mpCreatePayment)(data);
                new buyings_1.default({
                    payment: payment,
                    userId: req.$user.id
                }).save();
                res
                    .status(payment.status)
                    .json({ status: payment.status });
            }
            catch (error) {
                console.error(error);
                res
                    .status(error.status)
                    .json({ status: error.status, error: true, message: error.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro inesperado' });
        }
    });
};
