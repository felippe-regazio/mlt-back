"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CredentialsSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, select: false },
    firstName: { type: String },
    lastName: { type: String }
});
exports.default = mongoose_1.default.model('credentials', CredentialsSchema);