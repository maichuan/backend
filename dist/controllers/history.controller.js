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
const Orders_1 = __importDefault(require("../models/Orders"));
const date_1 = require("../utils/date");
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
exports.getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers.id;
    if (id) {
        const history = yield Orders_1.default.findAll({
            where: {
                userId: id,
            },
            order: [['createdAt', 'DESC']],
            raw: true,
        });
        const data = [];
        yield Promise.all(history.map((h) => __awaiter(void 0, void 0, void 0, function* () {
            const resName = yield Restaurants_1.default.findOne({
                where: { id: h.restaurantId },
                attributes: ['name'],
                raw: true,
            });
            const date = date_1.getFullDate(h.createdAt);
            const singleData = data.find(d => d.date === date);
            const ordered = Object.assign(Object.assign({}, h), { time: date_1.getTime(h.createdAt), restaurantName: resName ? resName.name : '' });
            if (singleData) {
                singleData.ordered.push(ordered);
            }
            else {
                data.push({ date, ordered: [ordered] });
            }
        })));
        return res.json({ data });
    }
    else {
        return res.json('No user id');
    }
});
