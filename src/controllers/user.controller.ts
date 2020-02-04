import { Request, Response, request, response } from 'express'
import Users from '../models/Users'

export const signUp = async (req: Request, res: Response) => {
  const uid = req.body
  // console.log(req.body)
  try {
    const findUser = await Users.findAll({
      where: uid,
    })
    console.log(findUser)
    if (findUser.length > 0) {
      console.log('KOjng Create USer')
      return res.json({
        message: 'This account already sign up.',
      })
    } else {
      console.log('Create USer')

      await Users.create(uid)
      return res.json({
        message: 'sign up success',
      })
    }
  } catch (e) {
    console.log(e)
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
