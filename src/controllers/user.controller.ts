import { Request, Response, request, response } from 'express'
import Users from '../models/Users'
import Restaurants from '../models/Restaurants'

export const signUp = async (req: Request, res: Response) => {
  const uid = req.body

  try {
    const user = await Users.findOne({
      where: uid,
      raw: true,
    })
    if (user) {
      return res.json({ user })
    } else {
      const newUser = await Users.create(uid)

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

export const createRestaurantOwner = async (req: Request, res: Response) => {
  const { uid, username, restaurantName, phoneno } = req.body

  try {
    const user = await Users.findOne({
      where: { uid, username },
      raw: true,
    })
    if (user) {
      return res.status(401).json({ message: 'User already exist' })
    } else {
      const newUser = await Users.create({ uid, username })

      const restaurant = await Restaurants.create({
        ownerId: newUser.id,
        name: restaurantName,
        phoneno,
      })

      return res.json({
        user: newUser,
        restaurant,
      })
    }
  } catch (e) {
    console.log(e)
    return res.json({
      message: 'Error: ' + e,
    })
  }
}
