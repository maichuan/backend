"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const omise_1 = __importDefault(require("omise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = omise_1.default({
    publicKey: process.env.OMISE_PUBLIC || '',
    secretKey: process.env.OMISE_SECRET || '',
});
