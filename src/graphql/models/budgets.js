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
  extend type Mutation {
    addBudget(amount: Float, trip_id: Int, source_id: Int, currency_id: Int): Budget
    updateBudget(id: ID!, amount: Float, trip_id: Int, source_id: Int, currency_id: Int): Budget
    deleteBudget(id: ID!): Int
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
  },
  Mutation: {
    addBudget: async (_, args) => db.budgets.create({
      amount: args.amount,
      trip_id: args.trip_id,
      source_id: args.source_id,
      currency_id: args.currency_id
    }),
    updateBudget: async (_, args) => {
      const params = { returning: true, where: { id: args.id } }
      const result = await db.budgets.update({
        amount: args.amount,
        trip_id: args.trip_id,
        source_id: args.source_id,
        currency_id: args.currency_id
      }, params)

      return result[1][0]
    },
    deleteBudget: async (_, { id }) => db.budgets.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
