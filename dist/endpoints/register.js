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
const functions_1 = require("../functions");
const credentials_1 = __importDefault(require("../database/models/credentials"));
module.exports = function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const emailAlreadyTaken = yield credentials_1.default.findOne({ email: data.email });
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
        }
        ;
        data.password = yield (0, functions_1.hashPassword)(data.password);
        credentials_1.default.findOneAndUpdate({ email: data.email }, data, { upsert: true })
            .then(() => {
            res.status(200).json({
                success: true,
                errorMessage: null,
            });
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({
                success: false,
                errorMessage: 'Um erro inesperado ocorreu',
            });
        });
    });
};
