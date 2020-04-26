"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const router = express_1.Router();
router
    .route('/')
    .get(search_controller_1.getSearch)
    .post(search_controller_1.getSearch);
exports.default = router;
