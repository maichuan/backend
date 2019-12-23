import { Request, Response, NextFunction } from 'express'

export const getMenu = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'get menu',
  })
}

export const postMenu = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'create new menu',
  })
}
