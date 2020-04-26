import App from './app'

const main = async () => {
  const app = new App(process.env.PORT || 3000)
  await app.listen()
}

main()
