import { Request, Response } from 'express'
import Restaurants from '../models/Restaurants'
import * as geolib from 'geolib'
import { Restaurant } from '../interface/restaurant'
import Users from '../models/Users'

import Sequelize from 'sequelize'
import { getTrendRestaurant } from './rank.controller'
import { GeolibInputCoordinates } from 'geolib/es/types'

const { ne } = Sequelize.Op

export const indexWelcome = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { lat, long } = req.query

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
    console.log(lat, long)
    const fromCoor: GeolibInputCoordinates = { latitude: lat, longitude: long }
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

    // const distance = geolib.getDistance(
    //   { latitude: lat, longitude: long },
    //   { latitude: , longitude:  }
    // )
    // console.log("distance");
    // console.log(distance);
  }

  const trends = await getTrendRestaurant()

  return res.json({ restaurants: getRestaurants, trends })
}
