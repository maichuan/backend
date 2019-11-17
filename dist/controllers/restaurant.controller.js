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
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
exports.getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurants_1.default.findAll();
        return res.json(restaurants);
    }
    catch (e) {
        console.log(e);
    }
});
exports.createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRestaurant = req.body;
    console.log(newRestaurant);
    try {
        yield Restaurants_1.default.create(newRestaurant);
        return res.json({
            message: 'Restaurant Created',
        });
    }
    catch (e) {
        return res.json({
            message: 'Error: ' + e,
        });
    }
});
exports.getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const restaurant = yield Restaurants_1.default.findByPk(id);
    return res.json(restaurant);
});
exports.deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Restaurants_1.default.destroy({ where: { id } });
    return res.json({ message: 'restaurant deleted' });
});
exports.updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const restaurant = req.body;
    yield Restaurants_1.default.update(restaurant, { where: { id } });
    return res.json({ message: 'restaurant updated' });
});
