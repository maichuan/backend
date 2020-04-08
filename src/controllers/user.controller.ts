import { Request, Response, request, response } from 'express'
import Users from '../models/Users'

export const signUp = async (req: Request, res: Response) => {
  const uid = req.body

  try {
    const user = await Users.findAll({
      where: uid,
      raw: true,
    })
    console.log(user)
    if (user.length > 0) {
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

export const findUser = async (req: Request, res: Response) => {
  const uid = req.params.id
  console.log(uid)

  try {
    const user = await Users.findOne({
      where: { uid },
      raw: true,
    })
    console.log(user)

    return res.json({ user })
  } catch (e) {
    console.log(e)
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
