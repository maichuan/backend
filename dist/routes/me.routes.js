"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const me_controller_1 = require("../controllers/me.controller");
const router = express_1.Router();
// User profile API
// const reqBody = {
//   token: 'hfijreigjioefjiooi4r94f',
// }
// const body = {
//   name: 'Kong',
//   imgURL: 'fkdmflkvd',
//   TBA
// }
router.route('/').get(index_controller_1.indexWelcome);
// Current Order
// const body = {
//   queue: 1,
//   orderStatus: 'processing',
//   menu: 'Padthai',
// }
router.route('/order').get(me_controller_1.getOrder);
// Order History
// const body = {
//   histories: [{menu: 'padthai', status: 'success'}, {...}]
// }
router.route('/orders').get(me_controller_1.getOrders);
exports.default = router;
