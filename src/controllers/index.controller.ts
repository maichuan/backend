import { Request, Response } from 'express'
import Restaurants from '../models/Restaurants'
import * as geolib from 'geolib'
import { Restaurant } from '../interface/restaurant'

import Sequelize from 'sequelize'
import { getTrendRestaurant } from './rank.controller'
import { GeolibInputCoordinates } from 'geolib/es/types'

const { ne } = Sequelize.Op

export const indexWelcome = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const lat = req.query.lat as string
  const long = req.query.long as string

  const getRestaurants = await Restaurants.findAll({
    where: {
      lat: {
        [ne]: null,
      },
      long: {
        [ne]: null,
      },
    },
    raw: true,
  })

  if (lat !== undefined && long !== undefined) {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(long)
    const fromCoor: GeolibInputCoordinates = { latitude, longitude }

    const distance = (restaurant: Restaurant) => {
      const toCoor: GeolibInputCoordinates = {
        latitude: restaurant.lat,
        longitude: restaurant.long,
      }
      return geolib.getDistance(fromCoor, toCoor)
    }

    getRestaurants.sort((a: any, b: any) => {
      return distance(a) - distance(b)
    })
  }

  const trends = await getTrendRestaurant()

  return res.json({ restaurants: getRestaurants, trends })
}
