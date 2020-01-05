import { Request, Response } from 'express'
import Users from '../models/Users'
import { User, PasswordCompare } from '../interface/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signUp = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.json({
      message: 'Please provide a username, email and a password.',
    })
  } else {
    const newUser: User = req.body
    console.log(newUser)

    try {
      await Users.create(newUser)
      return res.json({
        message: 'User Created',
      })
    } catch (e) {
      return res.json({
        message: 'Error: ' + e,
      })
    }
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res.status(404).json({
      message: 'username and password are needed!',
    })
  } else {
    const username = req.body.username
    const password = req.body.password
    const potentialUser = {
      where: {
        username,
      },
    }
    try {
      const user = await Users.findOne(potentialUser)
      if (!user) {
        return res.status(404).json({
          message: 'Authentication failed!',
        })
      } else {
        const isMatch = comparePasswords({
          password,
          dbPassword: user.password,
        })

        if (isMatch) {
          const token = jwt.sign(
            {
              username: user.username,
            },
            '555',
          )
          return res.json({
            success: true,
            token: `JWT ${token}`,
            role: user.role,
          })
        } else {
          return res.status(404).json({
            message: 'Login failed!',
          })
        }
        // user.comparePasswords(password, (error, isMatch) => {
        //   if (isMatch && !error) {
        //     const token = jwt.sign(
        //       {
        //         username: user.username,
        //       },
        //       config.keys.secret,
        //       {
        //         expiresIn: '300m',
        //       },
        //     )
        //     return res.json({
        //       success: true,
        //       token: `JWT ${token}`,
        //       role: user.role,
        //     })
        //   } else {
        //     return res.status(404).json({
        //       message: 'Login failed!',
        //     })
        //   }
        // })
      }
    } catch (e) {
      return res.status(500).json({
        message: 'There was an error!',
      })
    }
  }
}

export const logout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  return res.json({
    message: 'Logout Success',
  })
}

const comparePasswords = ({
  password,
  dbPassword,
}: PasswordCompare): Promise<boolean> => {
  const match = bcrypt.compare(password, dbPassword, (error, isMatch) => {
    if (error) {
      return false
    }
    return isMatch
  })
  return match
  // return new Promise(() => true)
}
