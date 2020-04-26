"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordered_controller_1 = require("../controllers/ordered.controller");
const router = express_1.default();
router.route('/:transactionId').get(ordered_controller_1.getOrderedByTransactionId);
exports.default = router;
