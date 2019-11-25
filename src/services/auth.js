const crypto = require('crypto')
const db = require('../database')
const config = require('../config')


const hashedPwd = (password) => {
  const [p1, p2, p3] = config.auth.salt.split('.')
  const salted = `$${p1}$${password}$${p2}$${p3}$`

  return crypto.createHmac('sha256', config.auth.secret).update(salted).digest('hex')
}

const authenticate = async ({ email, password }) => {
  const user = await db.users.findOne({
    where: { email, password: hashedPwd(password) }
  })

  if (!user) {
    throw new Error('Unauthorized!')
  }

  return user.token
}

module.exports = {
  authenticate
}
