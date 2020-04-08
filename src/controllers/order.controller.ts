import { Request, Response } from 'express'

import ConfirmOrders from '../models/ConfirmOrders'
import { Order, OrderMenu } from '../interface/order'
import Orders from '../models/Orders'
import Transactions from '../models/Transactions'

// status = {
//   -1: order but not confirm,
//   0: in queue,
//   1: processing
// }

export const getConfirmOrder = async (req: Request, res: Response) => {
  const uid = req.body
  const confOrders = await ConfirmOrders.findAll({
    where: {
      uid,
    },
  })
  return res.json(confOrders)
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

    order.menus.map(
      async menu =>
        await ConfirmOrders.create({
          userId: order.userId,
          status: 0,
          orderId: createdOrder.id,
          menuId: menu.id,
          quantity: menu.quantity,
          details: JSON.stringify(menu.answers),
        }),
    )

    return res.json({
      message: 'Selected order success',
    })
  } catch (e) {
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
