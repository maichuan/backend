import omise from 'omise'
import dotenv from 'dotenv'

dotenv.config()

export default omise({
  publicKey: process.env.OMISE_PUBLIC || '',
  secretKey: process.env.OMISE_SECRET || '',
})
