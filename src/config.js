const { env } = process

module.exports = {
  db: {
    uri: env.DATABASE_URL_NO_SSL
  }
}
