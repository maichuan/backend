import { Request, Response } from 'express'

import Restaurants from '../models/Restaurants'

export const getSearch = async (req: Request, res: Response) => {
  const q = req.query

  return res.json()
}
