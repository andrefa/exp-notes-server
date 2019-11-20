const { gql } = require('apollo-server-express')
const db = require('../../database')
const queries = require('./queries')


const typeDefs = gql`
  extend type Query {
    spentPerSource(trip_id: ID!): [SpentPerSource]
    spentPerCategory(trip_id: ID!): [SpentPerCategory]
    spentPerDayAndCategory(trip_id: ID!): [SpentPerDayAndCategory]
    remainingAmountPerSource(trip_id: ID!): [RemainingAmountPerSource]
  }
  type SpentPerSource { source: String amount: Float }
  type SpentPerCategory { category: String amount: Float }
  type SpentPerDayAndCategory { day: String category: String amount: Float }
  type RemainingAmountPerSource { source: String amount: Float remaining_per_source: Float }
`

const runQuery = async (query) => db.sequelize.query(
  query, { type: db.sequelize.QueryTypes.SELECT }
)

const resolvers = {
  Query: {
    spentPerSource: async (_, args) => runQuery(queries.spentPerSource(args.trip_id)),
    spentPerCategory: async (_, args) => runQuery(queries.spentPerCategory(args.trip_id)),
    spentPerDayAndCategory: async (_, args) => runQuery(
      queries.spentPerDayAndCategory(args.trip_id)
    ),
    remainingAmountPerSource: async (_, args) => runQuery(
      queries.remainingAmountPerSource(args.trip_id)
    )
  }
}

module.exports = {
  typeDefs,
  resolvers
}
