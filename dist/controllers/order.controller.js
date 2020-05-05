"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const ConfirmOrders_1 = __importDefault(require("../models/ConfirmOrders"));
const Orders_1 = __importDefault(require("../models/Orders"));
const Transactions_1 = __importDefault(require("../models/Transactions"));
const Menus_1 = __importDefault(require("../models/Menus"));
const OrderQueues_1 = __importDefault(require("../models/OrderQueues"));
const notification_1 = require("../utils/notification");
// status = {
//   -1: order but not confirm,
//   0: in queue,
//   1: processing,
//   2: completed,
//   3: cancel by restaurant
//   4: cancel by user
// }
const { lt } = sequelize_1.default.Op;
exports.getConfirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers.id;
    if (id) {
        try {
            const confOrders = yield ConfirmOrders_1.default.findAll({
                where: {
                    userId: id,
                    status: {
                        [lt]: 2,
                    },
                },
                raw: true,
            });
            const orders = yield Promise.all(confOrders.map((c) => __awaiter(void 0, void 0, void 0, function* () {
                const { menuId } = c;
                const menu = yield Menus_1.default.findByPk(menuId, { raw: true });
                const queue = yield OrderQueues_1.default.findOne({
                    where: { confirmOrderId: c.id },
                    raw: true,
                });
                return Object.assign(Object.assign({}, c), { name: menu.name, queue: queue ? queue.seq : null });
            })));
            return res.json({ orders });
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    }
    else {
        return res.json('error');
    }
});
exports.postConfirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    try {
        const transaction = yield Transactions_1.default.create({
            totalPrice: order.totalPrice,
            chargeId: order.chargeId,
        });
        // type 0 = eat in, type 1 = take-away
        const createdOrder = yield Orders_1.default.create({
            restaurantId: order.restaurantId,
            userId: order.userId,
            transactionId: transaction.id,
            amount: order.menus.length,
            price: order.totalPrice,
            table: order.table,
            type: order.type,
        });
        order.menus.map((menu) => __awaiter(void 0, void 0, void 0, function* () {
            const confirmOrder = yield ConfirmOrders_1.default.create({
                userId: order.userId,
                status: 0,
                orderId: createdOrder.id,
                menuId: menu.id,
                quantity: menu.quantity,
                details: JSON.stringify(menu.answers),
                restaurantId: order.restaurantId,
                token: order.token || '',
            });
            const seq = yield OrderQueues_1.default.count({
                where: {
                    restaurantId: order.restaurantId,
                },
            });
            yield OrderQueues_1.default.create({
                restaurantId: order.restaurantId,
                confirmOrderId: confirmOrder.id,
                userId: order.userId,
                seq: seq + 1,
            });
        }));
        return res.json({
            message: 'Selected order success',
        });
    }
    catch (e) {
        return res.json({
            message: 'Error: ' + e,
        });
    }
});
exports.cancelOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, orderItemId, menuId } = req.body;
    // const userId = req.headers.id
    try {
        yield ConfirmOrders_1.default.update({ status: 4 }, { where: { id: orderItemId, status: 0 } });
        const { price } = (yield Menus_1.default.findOne({
            where: { id: menuId },
            attributes: ['price'],
            raw: true,
        })) || { price: 0 };
        const order = yield Orders_1.default.findOne({
            where: { id: orderId },
            raw: true,
        });
        if (order) {
            const { id, transactionId } = order;
            yield Orders_1.default.increment({ price: -price }, { where: { id } });
            yield Transactions_1.default.increment({ totalPrice: -price }, { where: { id: transactionId } });
        }
        return res.status(200).json('complete');
    }
    catch (e) {
        console.log(e);
        return res.status(401).json('failed');
    }
});
exports.getOrderByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resId } = req.params;
    const orders = yield Orders_1.default.findAll({
        where: { restaurantId: resId },
        raw: true,
    });
    if (orders) {
        const orderItemsId = orders.map(order => order.id);
        const orderItems = (yield ConfirmOrders_1.default.findAll({
            where: { orderId: orderItemsId, status: { [lt]: 2 } },
            raw: true,
        })) || [];
        const ordersWithName = yield Promise.all(orderItems.map((c) => __awaiter(void 0, void 0, void 0, function* () {
            const { menuId } = c;
            const menu = yield Menus_1.default.findByPk(menuId, { raw: true });
            return Object.assign(Object.assign({}, c), { name: menu.name });
        })));
        const formatOrder = ordersWithName.map(item => {
            return Object.assign(Object.assign({}, item), { details: JSON.parse(item.details) });
        });
        return res.json({ data: formatOrder });
    }
    return res.json({ data: [] });
});
exports.clearOrderByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resId } = req.params;
    const orders = yield ConfirmOrders_1.default.findAll({
        where: {
            restaurantId: resId,
            status: 0,
        },
        raw: true,
    });
    yield ConfirmOrders_1.default.update({ status: 3 }, { where: { id: orders.map(o => o.id) } });
    orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        const { price } = (yield Menus_1.default.findOne({
            where: { id: order.menuId },
            attributes: ['price'],
            raw: true,
        })) || { price: 0 };
        const orderId = yield Orders_1.default.findOne({
            where: { id: order.orderId },
            raw: true,
        });
        if (orderId) {
            const { id, transactionId } = orderId;
            yield Orders_1.default.increment({ price: -price }, { where: { id } });
            yield Transactions_1.default.increment({ totalPrice: -price }, { where: { id: transactionId } });
        }
    }));
    // console.log(orders)
    return res.json('complete');
});
exports.pickToCook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmOrderId } = req.body;
    try {
        // const nextQueue = await OrderQueues.findOne({
        //   where: { confirmOrderId },
        //   order: [['createdAt', 'ASC']],
        // })
        // if (nextQueue) {
        //   await ConfirmOrders.update(
        //     { status: 1 },
        //     { where: { id: confirmOrderId } },
        //   )
        //   await OrderQueues.destroy({
        //     where: { id: nextQueue.id },
        //   })
        // }
        const nextQueue = yield OrderQueues_1.default.findOne({
            where: { confirmOrderId },
        });
        if (nextQueue) {
            yield ConfirmOrders_1.default.update({ status: 1 }, { where: { id: nextQueue.confirmOrderId } });
            yield OrderQueues_1.default.destroy({
                where: { id: nextQueue.id },
            });
            const orderQueues = yield OrderQueues_1.default.findAll({
                where: { restaurantId: nextQueue.restaurantId },
                order: [['createdAt', 'ASC']],
                raw: true,
            });
            orderQueues.map((queue, i) => __awaiter(void 0, void 0, void 0, function* () {
                return yield OrderQueues_1.default.update({ seq: i + 1 }, {
                    where: {
                        restaurantId: queue.restaurantId,
                        confirmOrderId: queue.confirmOrderId,
                    },
                });
            }));
            return res.status(200).send({ message: 'completed' });
        }
        return res.status(401).send({ message: 'order not found' });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ message: 'failed' });
    }
});
exports.orderComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmOrderId } = req.body;
    const restaurantId = req.params.resId;
    yield ConfirmOrders_1.default.update({ status: 2 }, { where: { id: confirmOrderId } });
    const { menuId, token } = (yield ConfirmOrders_1.default.findByPk(confirmOrderId, {
        attributes: ['menuId', 'token'],
    })) || { token: null };
    if (token) {
        const { name } = (yield Menus_1.default.findByPk(menuId, {
            attributes: ['name'],
        })) || { name: 'No name' };
        notification_1.onOrderCompletePushNotification({
            token,
            title: 'Order Completed',
            name,
        });
    }
    const nextQueue = yield OrderQueues_1.default.findOne({
        where: { restaurantId },
        order: [['createdAt', 'ASC']],
    });
    if (nextQueue) {
        yield ConfirmOrders_1.default.update({ status: 1 }, { where: { id: nextQueue.confirmOrderId } });
        yield OrderQueues_1.default.destroy({
            where: { id: nextQueue.id },
        });
    }
    const orderQueues = yield OrderQueues_1.default.findAll({
        where: { restaurantId },
        order: [['createdAt', 'ASC']],
        raw: true,
    });
    orderQueues.map((queue, i) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderQueues_1.default.update({ seq: i + 1 }, {
            where: {
                restaurantId: queue.restaurantId,
                confirmOrderId: queue.confirmOrderId,
            },
        });
    }));
    return res.json('complete');
});
