const { gql } = require('apollo-server-express')
const db = require('../database')

const typeDefs = gql`
  extend type Query {
    trips: [Trip]
    trip(id: ID!): Trip
  }
  type Trip {
    id: ID!
    name: String
    start_date: String
    end_date: String
    budgets: [Budget]
    expenses: [Expense]
  }
  type Mutation {
    addTrip(name: String, start_date: String, end_date: String): Trip
  }
`

const resolvers = {
  Query: {
    trips: async () => db.trips.findAll(),
    trip: async (_, args) => db.trips.findByPk(args.id)
  },
  Trip: {
    budgets: async (obj) => db.budgets.findAll({ where: { trip_id: obj.id } }),
    expenses: async (obj) => db.expenses.findAll({ where: { trip_id: obj.id } })
  },
  Mutation: {
    addTrip: async (_, args) => db.trips.create({
      name: args.name,
      start_date: args.start_date,
      end_date: args.end_date
    })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
