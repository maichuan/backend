import axios from 'axios'
import { Notification } from '../interface/order'

const HOST = process.env.NOTIFICATION_HOST || 'http://localhost:2541/'

export const onOrderCompletePushNotification = (data: Notification) => {
  return axios.post(HOST, data)
}
