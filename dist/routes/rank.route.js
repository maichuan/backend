"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rank_controller_1 = require("../controllers/rank.controller");
const route = express_1.Router();
route
    .route('/')
    .get(rank_controller_1.getRank)
    .post(rank_controller_1.updateRestaurantRank);
route.route('/update').get(rank_controller_1.updateRestaurantRank);
exports.default = route;
