import { Request, Response } from 'express'

export const getRoom = async (req: Request, res: Response) => {
  return res.json({
    message: 'Succeeded in joining the group',
  })
}

export const postRoom = async (req: Request, res: Response) => {
  const id = req.params.id
  const roomId = req.params.roomId
}
