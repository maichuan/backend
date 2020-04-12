import { Request, Response } from 'express'
import ConfirmOrders from '../models/ConfirmOrders'
import Orders from '../models/Orders'
import Restaurants from '../models/Restaurants'
import Transactions from '../models/Transactions'
import Menus from '../models/Menus'

export const getOrderedByTransactionId = async (
  req: Request,
  res: Response,
) => {
  const transactionId = req.params.transactionId

  const transaction = await Transactions.findByPk(transactionId, { raw: true })

  const order = await Orders.findOne({ where: { transactionId }, raw: true })
  if (order) {
    const resName = await Restaurants.findOne({
      where: { id: order.restaurantId },
      attributes: ['name'],
      raw: true,
    })
    const confirmOrders = await ConfirmOrders.findAll({
      where: { orderId: order.id },
      raw: true,
    })

    const menus = await Promise.all(
      confirmOrders.map(async confirmOrder => {
        const menu = await Menus.findByPk(confirmOrder.menuId, { raw: true })
        return {
          name: menu ? menu.name : '',
          quantity: confirmOrder.quantity,
          totalPrice: menu ? menu.price * confirmOrder.quantity : 0,
          special: confirmOrder.details,
        }
      }),
    )

    return res.json({
      restaurantName: resName ? resName.name : '',
      transactionId,
      menus: menus ? menus : null,
      serviceCharge: transaction ? transaction.serviceCharge : 0,
      vat: transaction ? transaction.vat : 0,
      totalPrice: transaction ? transaction.totalPrice : 0,
    })
  }

  return res.json({ menus: [] })
}
