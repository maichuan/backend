import { Request, Response, NextFunction } from 'express'

export const getOrders = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'Return orders',
  })
}

export const getOrder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'Return order',
  })
}
