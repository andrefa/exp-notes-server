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
  extend type Mutation {
    addExpense(description: String, price: Float, date: String, trip_id: Int, category_id: Int, source_id: Int, place_id: Int, currency_id: Int): Expense
    updateExpense(id: ID!, description: String, price: Float, date: String, trip_id: Int, category_id: Int, source_id: Int, place_id: Int, currency_id: Int): Expense
    deleteExpense(id: ID!): Int
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
  },
  Mutation: {
    addExpense: async (_, args) => db.expenses.create({
      description: args.description,
      price: args.price,
      date: args.date,
      trip_id: args.trip_id,
      category_id: args.category_id,
      source_id: args.source_id,
      place_id: args.place_id,
      currency_id: args.currency_id
    }),
    updateExpense: async (_, args) => {
      const params = { returning: true, where: { id: args.id } }
      const result = await db.expenses.update({
        description: args.description,
        price: args.price,
        date: args.date,
        trip_id: args.trip_id,
        category_id: args.category_id,
        source_id: args.source_id,
        place_id: args.place_id,
        currency_id: args.currency_id
      }, params)

      return result[1][0]
    },
    deleteExpense: async (_, { id }) => db.expenses.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
