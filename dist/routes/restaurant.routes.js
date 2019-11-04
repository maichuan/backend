"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const router = express_1.Router();
router
    .route('/')
    .get(restaurant_controller_1.getRestaurants)
    .post(restaurant_controller_1.createRestaurant);
router
    .route('/:id')
    .get(restaurant_controller_1.getRestaurant)
    .delete(restaurant_controller_1.deleteRestaurant)
    .put(restaurant_controller_1.updateRestaurant);
exports.default = router;
