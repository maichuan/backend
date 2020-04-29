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
const omise_1 = __importDefault(require("../omise"));
exports.payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ message: 'Payment Success' });
    }
    catch (e) {
        console.log(e);
    }
});
exports.createCharges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId, totalPrice } = req.body;
    try {
        const response = yield omise_1.default.charges.create({
            description: 'Charge for order ID: 888',
            amount: totalPrice * 100,
            currency: 'thb',
            capture: false,
            card: tokenId,
        });
        const retrive = yield omise_1.default.charges.retrieve(response.id);
        // const capture = await omise.charges.capture(response.id)
        // console.log(capture)
        return res.status(200).json({ chargeId: response.id });
    }
    catch (e) {
        console.log('Error ', e);
        return res.status(402);
    }
});
