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
module.exports = function checkout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawBuyings = yield buyings_1.default.find({ userId: req === null || req === void 0 ? void 0 : req.$user.id });
        const buyings = (rawBuyings === null || rawBuyings === void 0 ? void 0 : rawBuyings.length) && rawBuyings.map((item) => {
            return {
                currency_id: item.payment.body.currency_id,
                date_created: item.payment.body.date_created,
                description: item.payment.body.description,
                status: item.payment.body.status,
            };
        });
        res.status(200).json(buyings);
    });
};
