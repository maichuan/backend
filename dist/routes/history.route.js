"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("../controllers/history.controller");
const router = express_1.Router();
router.route('/').get(history_controller_1.getHistory);
exports.default = router;
