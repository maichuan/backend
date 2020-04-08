import { Request, Response } from 'express'
import Sequelize from 'sequelize'

import Restaurants from '../models/Restaurants'

export const getSearch = async (req: Request, res: Response) => {
  const Op = Sequelize.Op
  const data: any[] = await Restaurants.findAll({
    where: {
      name: {
        [Op.like]: '%' + req.query.q + '%',
      },
    },
  })
  console.log(req.query)
  return res.json({ restaurants: data })
}

export const getWord = async (req: Request, res: Response) => {
  const word = req.query.q
  return res.json(req.query.q)
}
