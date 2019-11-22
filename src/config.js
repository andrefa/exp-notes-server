const { env } = process

module.exports = {
  app: {
    port: env.PORT
  },
  db: {
    uri: env.DATABASE_URL
  }
}
