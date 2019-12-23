import { Request, Response, NextFunction } from 'express'

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
