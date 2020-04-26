"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const HOST = process.env.NOTIFICATION_HOST || 'http://localhost:2541/';
exports.onOrderCompletePushNotification = (data) => {
    return axios_1.default.post(HOST, data);
};
