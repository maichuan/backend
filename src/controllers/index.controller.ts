import { Request, Response } from 'express'

export const indexWelcome = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json('Welcome to my ts node!')
}
