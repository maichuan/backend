"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const router = express_1.Router();
router.route('/:id').get(restaurant_controller_1.getIncomeById);
router.route('/:id/:date').get(restaurant_controller_1.getMenuEachDay);
exports.default = router;
