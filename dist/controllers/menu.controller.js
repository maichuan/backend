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
const Menus_1 = __importDefault(require("../models/Menus"));
exports.getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const menus = yield Menus_1.default.findAll({
        where: {
            restaurantId: id,
        },
    });
    return res.json({ data: menus });
});
exports.postMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = req.body;
    console.log(req.body);
    console.log(menu);
    yield Menus_1.default.create(menu);
    return res.json({
        message: 'create new menu',
    });
});
exports.questionConverter = (question) => {
    return question.split(',').map(q => {
        const questions = q.split(':');
        if (questions.length === 3) {
            return {
                question: questions[0],
                type: Number(questions[1]),
                choices: questions[2].split(';'),
            };
        }
        else {
            return {};
        }
    });
};
