import { Request, Response } from 'express'
import Sequelize from 'sequelize'

import ConfirmOrders from '../models/ConfirmOrders'
import Orders from '../models/Orders'
import Transactions from '../models/Transactions'
import Menus from '../models/Menus'
import { Order } from '../interface/order'
import OrderQueues from '../models/OrderQueues'

// status = {
//   -1: order but not confirm,
//   0: in queue,
//   1: processing,
//   2: completed,
// }

const { ne } = Sequelize.Op

export const getConfirmOrder = async (req: Request, res: Response) => {
  const id = req.headers.id

  if (id) {
    try {
      const confOrders = await ConfirmOrders.findAll({
        where: {
          userId: id,
          status: {
            [ne]: 2,
          },
        },
        raw: true,
      })

      const orders = await Promise.all(
        confOrders.map(async c => {
          const { menuId } = c
          const menu = await Menus.findByPk(menuId, { raw: true })

          return { ...c, name: menu!.name }
        }),
      )

      return res.json({ orders })
    } catch (e) {
      console.log(e)
      return res.json(e)
    }
  } else {
    return res.json('error')
  }
}

export const postConfirmOrder = async (req: Request, res: Response) => {
  const order: Order = req.body

  try {
    const transaction = await Transactions.create({
      totalPrice: order.totalPrice,
    })

    const createdOrder = await Orders.create({
      restaurantId: order.restaurantId,
      userId: order.userId,
      transactionId: transaction.id,
      amount: order.menus.length,
      price: order.totalPrice,
    })

    order.menus.map(async menu => {
      const confirmOrder = await ConfirmOrders.create({
        userId: order.userId,
        status: 0,
        orderId: createdOrder.id,
        menuId: menu.id,
        quantity: menu.quantity,
        details: JSON.stringify(menu.answers),
      })

      const seq = await OrderQueues.count({
        where: {
          restaurantId: order.restaurantId,
        },
      })

      await OrderQueues.create({
        restaurantId: order.restaurantId,
        confirmOrderId: confirmOrder.id,
        userId: order.userId,
        seq: seq + 1,
      })
    })

    return res.json({
      message: 'Selected order success',
    })
  } catch (e) {
    return res.json({
      message: 'Error: ' + e,
    })
  }
}

export const orderComplete = async (req: Request, res: Response) => {
  const { restaurantId, confirmOrderId } = req.body

  await ConfirmOrders.update({ status: 2 }, { where: { id: confirmOrderId } })

  const nextQueue = await OrderQueues.findOne({
    where: { restaurantId },
    order: [['createdAt', 'ASC']],
  })

  if (nextQueue) {
    await ConfirmOrders.update(
      { status: 1 },
      { where: { id: nextQueue.confirmOrderId } },
    )

    await OrderQueues.destroy({
      where: { id: nextQueue.id },
    })
  }

  const orderQueues = await OrderQueues.findAll({
    where: { restaurantId },
    order: [['createdAt', 'ASC']],
    raw: true,
  })

  orderQueues.map(
    async (queue, i) =>
      await OrderQueues.update(
        { seq: i + 1 },
        {
          where: {
            restaurantId: queue.restaurantId,
            confirmOrderId: queue.confirmOrderId,
          },
        },
      ),
  )

  return res.json('complete')
}
