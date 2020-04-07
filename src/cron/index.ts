import cron from 'node-cron'

export const updateRestaurantTrend = () => {
  console.log('updateRestaurantTrend called: ', new Date().toLocaleString())

  // In docker use UTC time zone. If you want to update at midnight in Thailand then, set to 1 17 * * *
  cron.schedule('1 17 * * *', () => {
    console.log('---------------------')
    console.log('Running Cron Job')
    // fs.unlink('./error.log', err => {
    //   if (err) throw err
    //   console.log('Error file succesfully deleted')
    // })
  })
}
