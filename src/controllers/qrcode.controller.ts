import { Request, Response } from 'express'
import QrCodes from '../models/QrCodes'
import { Qrcode } from '../interface/qrcode'

export const getQrcodes = async (req: Request, res: Response) => {
  const { restaurantId } = req.params

  const qrcodes = await QrCodes.findAll({ where: { restaurantId }, raw: true })

  return res.json({ qrcodes })
}

export const createQrCodes = async (req: Request, res: Response) => {
  const { restaurantId } = req.params
  const data: Qrcode = req.body

  try {
    await QrCodes.create(data)

    const qrcodes = await QrCodes.findAll({
      where: { restaurantId },
      raw: true,
    })

    return res.json({ qrcodes })
  } catch (e) {
    return res.status(500).json({ message: 'Cannot create new Qrcode' })
  }
}
