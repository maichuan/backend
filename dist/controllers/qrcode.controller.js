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
const QrCodes_1 = __importDefault(require("../models/QrCodes"));
exports.getQrcodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    const qrcodes = yield QrCodes_1.default.findAll({ where: { restaurantId }, raw: true });
    return res.json({ qrcodes });
});
exports.createQrCodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    const data = req.body;
    try {
        yield QrCodes_1.default.create(data);
        const qrcodes = yield QrCodes_1.default.findAll({
            where: { restaurantId },
            raw: true,
        });
        return res.json({ qrcodes });
    }
    catch (e) {
        return res.status(500).json({ message: 'Cannot create new Qrcode' });
    }
});
