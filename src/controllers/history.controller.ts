import { Request, Response } from 'express'
import Orders from '../models/Orders'

export const getHistory = async (req: Request, res: Response) => {
  const uid = req.query.uid
  const history = await Orders.findAll({
    where: {
      userId: uid,
    },
  })
  console.log('uid: ' + uid)
  console.log(history)
  return res.json({
    data: [history],
  })
}
