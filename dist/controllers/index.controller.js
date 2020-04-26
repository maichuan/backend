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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
const geolib = __importStar(require("geolib"));
const sequelize_1 = __importDefault(require("sequelize"));
const rank_controller_1 = require("./rank.controller");
const { ne } = sequelize_1.default.Op;
exports.indexWelcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = req.query.lat;
    const long = req.query.long;
    const getRestaurants = yield Restaurants_1.default.findAll({
        where: {
            lat: {
                [ne]: null,
            },
            long: {
                [ne]: null,
            },
        },
        raw: true,
    });
    if (lat !== undefined && long !== undefined) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);
        console.log(latitude, longitude);
        const fromCoor = { latitude, longitude };
        const distance = (restaurant) => {
            const toCoor = {
                latitude: restaurant.lat,
                longitude: restaurant.long,
            };
            return geolib.getDistance(fromCoor, toCoor);
        };
        getRestaurants.sort((a, b) => {
            return distance(a) - distance(b);
        });
    }
    const trends = yield rank_controller_1.getTrendRestaurant();
    return res.json({ restaurants: getRestaurants, trends });
});
