"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default();
router
    .route('/')
    .get(order_controller_1.getConfirmOrder)
    .post(order_controller_1.postConfirmOrder)
    .put(order_controller_1.cancelOrderByUser);
router
    .route('/:resId')
    .get(order_controller_1.getOrderByRestaurantId)
    .post(order_controller_1.clearOrderByRestaurantId)
    .put(order_controller_1.pickToCook);
router.route('/:resId/complete').post(order_controller_1.orderComplete);
exports.default = router;
