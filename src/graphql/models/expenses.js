const { gql } = require('apollo-server-express')
const db = require('../../database')

const typeDefs = gql`
  extend type Query {
    expenses: [Expense]
    expense(id: ID!): Expense
  }
  type Expense {
    id: ID!
    description: String
    price: Float
    date: String
    trip_id: Int
    trip: Trip
    category_id: Int
    category: Category
    source_id: Int
    source: Source
    place_id: Int
    place: Place
    currency_id: Int
    currency: Currency
  }
`

const resolvers = {
  Query: {
    expenses: async () => db.expenses.findAll(),
    expense: async (_, args) => db.expenses.findByPk(args.id)
  },
  Expense: {
    trip: async (obj) => db.trips.findByPk(obj.trip_id),
    category: async (obj) => db.categories.findByPk(obj.category_id),
    source: async (obj) => db.sources.findByPk(obj.source_id),
    place: async (obj) => db.places.findByPk(obj.place_id),
    currency: async (obj) => db.currencies.findByPk(obj.currency_id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
