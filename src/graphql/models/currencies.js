const { gql } = require('apollo-server-express')
const db = require('../../database')

const typeDefs = gql`
  extend type Query {
    currencies: [Currency]
    currency(id: ID!): Currency
  }
  type Currency {
    id: ID!
    name: String
    symbol: String
  }
  extend type Mutation {
    addCurrency(name: String, symbol: String): Currency
    updateCurrency(id: ID!, name: String, symbol: String): Currency
    deleteCurrency(id: ID!): Int
  }
`

const resolvers = {
  Query: {
    currencies: async () => db.currencies.findAll(),
    currency: async (_, args) => db.currencies.findByPk(args.id)
  },
  Mutation: {
    addCurrency: async (_, { name, symbol }) => db.currencies.create({ name, symbol }),
    updateCurrency: async (_, { id, name, symbol }) => {
      const params = { returning: true, where: { id } }
      const result = await db.currencies.update({ name, symbol }, params)
      return result[1][0]
    },
    deleteCurrency: async (_, { id }) => db.currencies.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
