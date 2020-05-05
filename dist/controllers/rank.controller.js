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
const RestautantRank_1 = __importDefault(require("../models/RestautantRank"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const RestaurantStatistics_1 = __importDefault(require("../models/RestaurantStatistics"));
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
exports.getRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ranks = yield RestautantRank_1.default.findAll({
        limit: 10,
        order: [['score', 'DESC']],
        where: {
            createdAt: {
                [sequelize_1.Op.and]: {
                    [sequelize_1.Op.gte]: moment_1.default()
                        .subtract(1, 'days')
                        .startOf('day')
                        .subtract(7, 'hours')
                        .toDate(),
                    [sequelize_1.Op.lte]: moment_1.default().toDate(),
                },
            },
        },
        raw: true,
    });
    return res.json({ data: ranks });
});
exports.updateRestaurantRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.headers['X-Appengine-Cron']) {
    const ranks = [];
    const orders = yield Orders_1.default.findAll({
        where: {
            updatedAt: {
                [sequelize_1.Op.and]: {
                    [sequelize_1.Op.gte]: moment_1.default()
                        .subtract(1, 'days')
                        .startOf('day')
                        .subtract(7, 'hours')
                        .toDate(),
                    [sequelize_1.Op.lte]: moment_1.default().toDate(),
                },
            },
        },
        raw: true,
    });
    const numclick = yield RestaurantStatistics_1.default.findAll({
        where: {
            createdAt: {
                [sequelize_1.Op.and]: {
                    [sequelize_1.Op.gte]: moment_1.default()
                        .subtract(1, 'days')
                        .startOf('day')
                        .subtract(7, 'hours')
                        .toDate(),
                    [sequelize_1.Op.lte]: moment_1.default().toDate(),
                },
            },
        },
        raw: true,
    });
    orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        const rankIndex = ranks.findIndex(rank => rank.resId === order.restaurantId);
        if (rankIndex >= 0) {
            ranks[rankIndex] = Object.assign(Object.assign({}, ranks[rankIndex]), { score: ranks[rankIndex].score + 3 });
        }
        else {
            ranks.push({ resId: order.restaurantId, score: 3 });
        }
    }));
    numclick.map((click) => __awaiter(void 0, void 0, void 0, function* () {
        const rankIndex = ranks.findIndex(rank => rank.resId === Number.parseInt(click.resId, 10));
        if (rankIndex >= 0) {
            ranks[rankIndex] = Object.assign(Object.assign({}, ranks[rankIndex]), { score: ranks[rankIndex].score + 1 });
        }
        else {
            ranks.push({ resId: Number.parseInt(click.resId, 10), score: 1 });
        }
    }));
    yield RestautantRank_1.default.bulkCreate(ranks);
    return res.status(200).send({ message: 'Update complete' });
    // }
    // return res.status(401).send({ message: 'Resquest without token' })
});
exports.getTrendRestaurant = () => __awaiter(void 0, void 0, void 0, function* () {
    const ranks = yield RestautantRank_1.default.findAll({
        limit: 10,
        order: [['score', 'DESC']],
        where: {
            createdAt: {
                [sequelize_1.Op.and]: {
                    [sequelize_1.Op.gte]: moment_1.default()
                        .subtract(1, 'days')
                        .startOf('day')
                        .subtract(7, 'hours')
                        .toDate(),
                    [sequelize_1.Op.lte]: moment_1.default().toDate(),
                },
            },
        },
        raw: true,
    });
    const ids = ranks.map(r => r.resId);
    const restaurants = yield Restaurants_1.default.findAll({
        where: { id: ids },
        raw: true,
    });
    const trends = restaurants.map(restaurant => {
        const { score } = ranks.find(rank => rank.resId === restaurant.id) || {
            score: 0,
        };
        return Object.assign(Object.assign({}, restaurant), { score });
    });
    return trends.sort((a, b) => b.score - a.score);
});
