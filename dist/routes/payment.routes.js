"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.Router();
// getPayment API
router
    .route('/')
    .get(payment_controller_1.payment)
    .post(payment_controller_1.createCharges);
exports.default = router;
