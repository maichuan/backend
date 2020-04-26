"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu.controller");
const router = express_1.Router();
// getMenu API (only owner of restaurant)
// const body = [{
//   menu: 'padthai',
//   price: 40,
//   info: '' || null,
//   imgURL: 'www.fdfdf.com'
// }, {...}]
// postMenu API
// const reqBody = {
//   menu: 'kapow',
//   price: 15,
//   info: '' || null,
//   imgURL: 'www.image.com'
// }
router.route('/').post(menu_controller_1.postMenu);
router.route('/:id').get(menu_controller_1.getMenu);
exports.default = router;
