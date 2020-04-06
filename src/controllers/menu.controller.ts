import { Request, Response, NextFunction } from 'express'
import Menus from '../models/Menus'

export const getMenu = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const menus = await Menus.findAll({
    where: {
      restaurantId: id,
    },
  })
  return res.json({ data: menus })
}

export const postMenu = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'create new menu',
  })
}

export const questionConverter = (question: string) => {
  return question.split(',').map(q => {
    const questions = q.split(':')
    if (questions.length === 3) {
      return {
        question: questions[0],
        type: Number(questions[1]),
        choices: questions[2].split(';'),
      }
    } else {
      return {}
    }
  })
}
