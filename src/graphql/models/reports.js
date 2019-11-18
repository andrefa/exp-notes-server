const { gql } = require('apollo-server-express')
const db = require('../../database')
const queries = require('./queries')


const typeDefs = gql`
  extend type Query {
    spentPerSource(trip_id: ID!): [SpentPerSource]
    spentPerCategory(trip_id: ID!): [SpentPerCategory]
    spentPerDay(trip_id: ID!): [SpentPerDay]
    remainingDays(trip_id: ID!): RemainingDays
    remainingAmountPerSource(trip_id: ID!): [RemainingAmountPerSource]
    remainingAmountPerDay(trip_id: ID!): RemainingAmountPerDay
  }
  type SpentPerSource { source: String amount: Float }
  type SpentPerCategory { category: String amount: Float }
  type SpentPerDay { day: String amount: Float }
  type RemainingDays { remaining_days: Int }
  type RemainingAmountPerSource { source: String amount: Float remaining_per_source: Float }
  type RemainingAmountPerDay { remaining_per_day: Float }
`

const runQuery = async (query) => db.sequelize.query(
  query, { type: db.sequelize.QueryTypes.SELECT }
)

const runSingleRowQuery = async (query) => db.sequelize.query(
  query, { type: db.sequelize.QueryTypes.SELECT, plain: true }
)

const resolvers = {
  Query: {
    spentPerSource: async (_, args) => runQuery(queries.spentPerSource(args.trip_id)),
    spentPerCategory: async (_, args) => runQuery(queries.spentPerCategory(args.trip_id)),
    spentPerDay: async (_, args) => runQuery(queries.spentPerDay(args.trip_id)),
    remainingDays: async (_, args) => runSingleRowQuery(
      queries.remainingDays(args.trip_id)
    ),
    remainingAmountPerSource: async (_, args) => runQuery(
      queries.remainingAmountPerSource(args.trip_id)
    ),
    remainingAmountPerDay: async (_, args) => runSingleRowQuery(
      queries.remainingAmountPerDay(args.trip_id)
    )
  }
}

module.exports = {
  typeDefs,
  resolvers
}
