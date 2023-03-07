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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const functions_1 = require("../functions");
const jwt_1 = require("../jwt/jwt");
const credentials_1 = __importDefault(require("../database/models/credentials"));
module.exports = function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const user = yield credentials_1.default.findOne({ email: data.email }).select('+password');
        const passok = user && (yield (0, functions_1.comparePassword)(data.password, (user === null || user === void 0 ? void 0 : user.password) || ''));
        if (!user || !passok) {
            res.status(401).json({
                success: false,
                errorMessage: 'Usuário inexistente ou senha inválida.',
            });
            return false;
        }
        if (user && passok) {
            const userData = (user === null || user === void 0 ? void 0 : user.toObject()) || {};
            delete userData.password;
            const token = (0, jwt_1.encodeJWT)(userData);
            res
                .cookie(jwt_1.JWT_COOKIE_NAME, token, {
                maxAge: 900000000,
                domain: process.env.JWT_COOKIE_DOMAIN,
                path: '/',
                secure: true,
                sameSite: 'none',
                httpOnly: true
            })
                .status(200)
                .json({ success: true });
        }
    });
};
