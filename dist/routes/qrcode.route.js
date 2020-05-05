"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qrcode_controller_1 = require("../controllers/qrcode.controller");
const router = express_1.Router();
router
    .route('/:restaurantId')
    .get(qrcode_controller_1.getQrcodes)
    .post(qrcode_controller_1.createQrCodes);
exports.default = router;
