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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.connect();
        const restaurants = yield conn.query('SELECT * FROM restaurants');
        return res.json(restaurants[0]);
    }
    catch (e) {
        console.log(e);
    }
});
exports.createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRestaurant = req.body;
    const con = yield database_1.connect();
    yield con.query('Insert into restaurants set ?', [newRestaurant]);
    return res.json({
        message: 'Restaurant Created',
    });
});
exports.getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const con = yield database_1.connect();
    const restaurant = yield con.query('select * from restaurants where id = ?', [
        id,
    ]);
    return res.json(restaurant[0]);
});
exports.deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const con = yield database_1.connect();
    yield con.query('delete from restaurants where id = ?', [id]);
    return res.json({ message: 'restaurant deleted' });
});
exports.updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const restaurant = req.body;
    const con = yield database_1.connect();
    yield con.query('update restaurant set ? where id = ?', [restaurant, id]);
    return res.json({ message: 'restaurant updated' });
});
