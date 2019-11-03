const { gql } = require('apollo-server-express')
const db = require('../database')

const typeDefs = gql`
  extend type Query {
    currencies: [Currency]
    currencie(id: ID!): Currency
  }
  type Currency {
    id: ID!
    name: String
    symbol: String
  }
`

const resolvers = {
  Query: {
    currencies: async () => db.currencies.findAll(),
    currencie: async (_, args) => db.currencies.findByPk(args.id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
