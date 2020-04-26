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
const Users_1 = __importDefault(require("../models/Users"));
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body;
    try {
        const user = yield Users_1.default.findOne({
            where: uid,
            raw: true,
        });
        if (user) {
            return res.json({ user });
        }
        else {
            const newUser = yield Users_1.default.create(uid);
            return res.json({
                user: newUser,
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.json({
            message: 'Error: ' + e,
        });
    }
});
exports.findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const isOwner = req.query.owner;
    try {
        const user = (yield Users_1.default.findOne({
            where: { uid },
            raw: true,
        })) || { id: 0 };
        if (isOwner) {
            const restaurant = yield Restaurants_1.default.findOne({
                where: { ownerId: user.id },
                raw: true,
            });
            return res.json({ user, restaurant });
        }
        return res.json({ user });
    }
    catch (e) {
        console.log(e);
        return res.json({
            message: 'Error: ' + e,
        });
    }
});
exports.createRestaurantOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, username, restaurantName, phoneno } = req.body;
    try {
        const user = yield Users_1.default.findOne({
            where: { uid, username },
            raw: true,
        });
        if (user) {
            return res.status(401).json({ message: 'User already exist' });
        }
        else {
            const newUser = yield Users_1.default.create({ uid, username });
            const restaurant = yield Restaurants_1.default.create({
                ownerId: newUser.id,
                name: restaurantName,
                phoneno,
            });
            return res.json({
                user: newUser,
                restaurant,
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.json({
            message: 'Error: ' + e,
        });
    }
});
