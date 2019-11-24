const { env } = process

module.exports = {
  auth: {
    salt: env.PWD_SALT,
    secret: env.SHA_SECRET
  },
  app: {
    port: env.PORT
  },
  db: {
    uri: env.DATABASE_URL
  }
}
