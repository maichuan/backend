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
const sequelize_1 = __importDefault(require("sequelize"));
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
exports.getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Op = sequelize_1.default.Op;
    const data = yield Restaurants_1.default.findAll({
        where: {
            name: {
                [Op.like]: '%' + req.query.q + '%',
            },
        },
    });
    console.log(req.query);
    return res.json({ restaurants: data });
});
exports.getWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.query.q;
    return res.json(req.query.q);
});
