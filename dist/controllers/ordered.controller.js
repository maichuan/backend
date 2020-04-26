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
const ConfirmOrders_1 = __importDefault(require("../models/ConfirmOrders"));
const Orders_1 = __importDefault(require("../models/Orders"));
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
const Transactions_1 = __importDefault(require("../models/Transactions"));
const Menus_1 = __importDefault(require("../models/Menus"));
exports.getOrderedByTransactionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.transactionId;
    const transaction = yield Transactions_1.default.findByPk(transactionId, { raw: true });
    const order = yield Orders_1.default.findOne({ where: { transactionId }, raw: true });
    if (order) {
        const resName = yield Restaurants_1.default.findOne({
            where: { id: order.restaurantId },
            attributes: ['name'],
            raw: true,
        });
        const confirmOrders = yield ConfirmOrders_1.default.findAll({
            where: { orderId: order.id },
            raw: true,
        });
        const menus = yield Promise.all(confirmOrders.map((confirmOrder) => __awaiter(void 0, void 0, void 0, function* () {
            const menu = yield Menus_1.default.findByPk(confirmOrder.menuId, { raw: true });
            return {
                name: menu ? menu.name : '',
                quantity: confirmOrder.quantity,
                totalPrice: menu ? menu.price * confirmOrder.quantity : 0,
                special: confirmOrder.details,
            };
        })));
        return res.json({
            restaurantName: resName ? resName.name : '',
            transactionId,
            menus: menus ? menus : null,
            serviceCharge: transaction ? transaction.serviceCharge : 0,
            vat: transaction ? transaction.vat : 0,
            totalPrice: transaction ? transaction.totalPrice : 0,
        });
    }
    return res.json({ menus: [] });
});
