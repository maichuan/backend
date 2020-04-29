import { Request, Response, NextFunction } from 'express'
import omise from '../omise'

export const payment = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    return res.json({ message: 'Payment Success' })
  } catch (e) {
    console.log(e)
  }
}

export const createCharges = async (req: Request, res: Response) => {
  const { tokenId, totalPrice } = req.body
  try {
    const response = await omise.charges.create({
      description: 'Charge for order ID: 888',
      amount: totalPrice * 100, // 1,000 Baht
      currency: 'thb',
      capture: false,
      card: tokenId,
    })

    const retrive = await omise.charges.retrieve(response.id)
    // const capture = await omise.charges.capture(response.id)
    // console.log(capture)
    return res.status(200).json({ chargeId: response.id })
  } catch (e) {
    console.log('Error ', e)
    return res.status(402)
  }
}
