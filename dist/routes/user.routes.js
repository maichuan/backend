"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
router.route('/signup').post(user_controller_1.signUp);
router.route('/:id').get(user_controller_1.findUser);
router.route('/owner').post(user_controller_1.createRestaurantOwner);
exports.default = router;
