import { Request, Response } from 'express'
import ConfirmOrders from '../models/ConfirmOrders'

export const getHistory = async (req: Request, res: Response) => {
  const uid = req.query.uid
  const history = await ConfirmOrders.findAll({
    where: {
      userId: uid,
    },
  })
  console.log('uid: ' + uid)
  console.log(history)
  return res.json({
    data: history,
  })
}
