"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const menu_controller_1 = require("../controllers/menu.controller");
const router = express_1.Router();
router
    .route('/')
    .get(restaurant_controller_1.getRestaurants)
    .post(restaurant_controller_1.createRestaurant);
router.route('/:id/menus').post(menu_controller_1.postMenu);
router
    .route('/:id/:roomId')
    .get()
    .post();
router.route('/statistic').get(restaurant_controller_1.getStat);
router.route('/summary/:id').get(restaurant_controller_1.getIncomeById);
router.route('/summary/:id/:date').get(restaurant_controller_1.getMenuEachDay);
router.route('/click').post(restaurant_controller_1.postStat);
router
    .route('/:id')
    .get(restaurant_controller_1.getRestaurant)
    .delete(restaurant_controller_1.deleteRestaurant)
    .put(restaurant_controller_1.updateRestaurant);
exports.default = router;
