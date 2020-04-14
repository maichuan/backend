import { Request, Response, request, response } from 'express'
import Users from '../models/Users'
import Restaurants from '../models/Restaurants'

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

      const newUser = await Users.create(uid)
      console.log(newUser)

      return res.json({
        user: newUser,
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
  const isOwner = req.query.owner

  try {
    const user = (await Users.findOne({
      where: { uid },
      raw: true,
    })) || { id: 0 }

    if (isOwner) {
      const restaurant = await Restaurants.findOne({
        where: { ownerId: user.id },
        raw: true,
      })
      return res.json({ user, restaurant })
    }

    return res.json({ user })
  } catch (e) {
    console.log(e)
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
