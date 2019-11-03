const { gql } = require('apollo-server-express')
const db = require('../../database')

const typeDefs = gql`
  extend type Query {
    budgets: [Budget]
    budget(id: ID!): Budget
  }
  type Budget {
    id: ID!
    amount: Float
    trip_id: Int
    trip: Trip
    source_id: Int
    source: Source
    currency_id: Int
    currency: Currency
  }
`

const resolvers = {
  Query: {
    budgets: async () => db.budgets.findAll(),
    budget: async (_, args) => db.budgets.findByPk(args.id)
  },
  Budget: {
    source: async (obj) => db.sources.findByPk(obj.source_id),
    trip: async (obj) => db.trips.findByPk(obj.trip_id),
    currency: async (obj) => db.currencies.findByPk(obj.currency_id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
