import { Request, Response } from 'express'
import Restaurants from '../models/Restaurants'
import * as geolib from 'geolib'
import { Restaurant } from '../interface/restaurant'

export const indexWelcome = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { lat, long } = req.query
  console.log(lat, long)

  const getRestaurants = await Restaurants.findAll({ raw: true })

  if (lat !== undefined && long !== undefined) {
    console.log(lat, long)
    const distance = (restaurant: Restaurant) =>
      geolib.getDistance(
        { latitude: lat, longitude: long },
        { latitude: restaurant.lat, longitude: restaurant.long },
      )

    getRestaurants.sort((a: any, b: any) => {
      return distance(a) - distance(b)
    })

    // const distance = geolib.getDistance(
    //   { latitude: lat, longitude: long },
    //   { latitude: , longitude:  }
    // )
    // console.log("distance");
    // console.log(distance);
  }
  return res.json({ restaurants: getRestaurants, trends: [] })
}
