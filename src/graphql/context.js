const db = require('../database')

const getUser = async (token) => db.users.findOne({ where: { token } })

const context = async ({ req }) => {
  const token = req.headers.authorization || ''
  const user = await getUser(token)

  if (!user) {
    throw new Error('you must be logged in')
  }

  return { user }
}

module.exports = context
