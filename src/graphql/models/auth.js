const crypto = require('crypto')
const { gql } = require('apollo-server-express')
const db = require('../../database')
const config = require('../../config')


const typeDefs = gql`
  extend type Query {
    authenticate(email: String! password: String!): String
  }
`

const hashedPwd = (password) => {
  const [p1, p2, p3] = config.auth.salt.split('.')
  const salted = `$${p1}$${password}$${p2}$${p3}$`

  return crypto.createHmac('sha256', config.auth.secret).update(salted).digest('hex')
}

const resolvers = {
  Query: {
    authenticate: async (_, { email, password }) => {
      const user = await db.users.findOne({
        where: { email, password: hashedPwd(password) }
      })

      if (!user) {
        throw new Error('Unauthorized!')
      }

      return user.token
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
