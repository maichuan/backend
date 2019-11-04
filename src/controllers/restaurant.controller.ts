import { Request, Response } from 'express'
import { connect } from '../database'

import { Restaurant } from '../interface/restaurant'

export const getRestaurants = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const conn = await connect()
    const restaurants = await conn.query('SELECT * FROM restaurants')
    return res.json(restaurants[0])
  } catch (e) {
    console.log(e)
  }
}

export const createRestaurant = async (req: Request, res: Response) => {
  const newRestaurant: Restaurant = req.body
  const con = await connect()

  await con.query('Insert into restaurants set ?', [newRestaurant])

  return res.json({
    message: 'Restaurant Created',
  })
}

export const getRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const con = await connect()
  const restaurant = await con.query('select * from restaurants where id = ?', [
    id,
  ])

  return res.json(restaurant[0])
}

export const deleteRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const con = await connect()
  await con.query('delete from restaurants where id = ?', [id])

  return res.json({ message: 'restaurant deleted' })
}

export const updateRestaurant = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.params.id
  const restaurant = req.body
  const con = await connect()
  await con.query('update restaurant set ? where id = ?', [restaurant, id])

  return res.json({ message: 'restaurant updated' })
}
