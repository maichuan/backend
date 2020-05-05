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
const Menus_1 = __importDefault(require("../models/Menus"));
const RestautantRank_1 = __importDefault(require("../models/RestautantRank"));
const RestaurantStatistics_1 = __importDefault(require("../models/RestaurantStatistics"));
const Orders_1 = __importDefault(require("../models/Orders"));
const date_1 = require("../utils/date");
const ConfirmOrders_1 = __importDefault(require("../models/ConfirmOrders"));
const sequelize_1 = require("sequelize");
exports.getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurants_1.default.findAll();
        return res.json({ restaurants });
    }
    catch (e) {
        console.log(e);
    }
});
exports.createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRestaurant = req.body;
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
    const menus = yield Menus_1.default.findAll({
        where: {
            restaurantId: id,
        },
        raw: true,
    });
    const formatMenu = menus.map(m => (Object.assign(Object.assign({}, m), { question: JSON.parse(m.question) })));
    return res.json(Object.assign(Object.assign({}, JSON.parse(JSON.stringify(restaurant))), { menus: formatMenu }));
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
    const r = yield Restaurants_1.default.findByPk(id);
    return res.json({ restaurant: r });
});
exports.getStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resRank = yield RestautantRank_1.default.findAll();
        return res.json({ data: resRank });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.postStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStat = req.body;
    try {
        yield RestaurantStatistics_1.default.create(newStat);
        res.json({ message: 'success to post' });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.getIncomeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = [];
    const orders = yield Orders_1.default.findAll({
        order: [['updatedAt', 'DESC']],
        where: {
            restaurantId: id,
        },
    });
    let price = 0;
    let oldDate;
    orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        const date = date_1.getFullDate(order.updatedAt);
        if (oldDate === null || oldDate === undefined) {
            data.push({
                date,
                income: order.price,
            });
            oldDate = date;
            price = order.price;
        }
        else {
            if (oldDate === date) {
                price = price + order.price;
                data.pop();
                data.push({
                    date: oldDate,
                    income: price,
                });
            }
            else {
                data.push({
                    date,
                    income: order.price,
                });
                price = order.price;
                oldDate = date;
            }
        }
    }));
    return res.json({
        data,
    });
});
exports.getMenuEachDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const date = req.params.date.replace(/\_/g, '/');
    const dates = date.split('/').map(d => +d);
    const startDay = new Date(dates[2], dates[1] - 1, dates[0]);
    const endDay = new Date();
    endDay.setDate(startDay.getDate());
    endDay.setHours(16, 59, 59, 999);
    startDay.setDate(startDay.getDate() - 1);
    startDay.setHours(17, 0, 0, 0);
    const orderItems = yield ConfirmOrders_1.default.findAll({
        // order: [['updatedAt', 'DESC']],
        where: {
            restaurantId: id,
            updatedAt: {
                [sequelize_1.Op.and]: {
                    [sequelize_1.Op.gte]: startDay,
                    [sequelize_1.Op.lte]: endDay,
                },
            },
        },
        raw: true,
    });
    const menus = [];
    // let menuId: number = 0
    // let quantity = 0
    // let oldDate = ''
    yield Promise.all(orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const menu = yield Menus_1.default.findByPk(item.menuId);
        // let flag = 0
        if (menus.length === 0) {
            menus.push({
                id: item.menuId,
                name: menu.name,
                price: menu.price,
                quantity: item.quantity,
                totalPrice: item.quantity * menu.price,
            });
        }
        else {
            const findItem = menus.find(d => d.id === item.menuId);
            if (findItem) {
                findItem.quantity = findItem.quantity + item.quantity;
                findItem.totalPrice = findItem.quantity * findItem.price;
            }
            else {
                menus.push({
                    id: item.menuId,
                    name: menu.name,
                    price: menu.price,
                    quantity: item.quantity,
                    totalPrice: item.quantity * menu.price,
                });
            }
        }
    })));
    const totalPrice = menus.reduce((prev, cur) => prev + cur.totalPrice, 0);
    return res.json({ date, menus, totalPrice });
});
