const { gql } = require('apollo-server-express')
const db = require('../../database')
const queries = require('./queries')

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
    users: [User]
    budgets: [Budget]
    expenses: [Expense]
    tasks: [Task]
    remaining_days: Int
    remaning_amount_per_day: Float
  }
  type User {
    id: ID!
    name: String
    email: String
  }
  extend type Mutation {
    addTrip(name: String, start_date: String, end_date: String): Trip
    updateTrip(id: ID!, name: String, start_date: String, end_date: String): Trip
    deleteTrip(id: ID!): Int
  }
`

const runQuery = async (query, column) => {
  const result = await db.sequelize.query(
    query, { type: db.sequelize.QueryTypes.SELECT, plain: true }
  )

  return result[column]
}

const resolvers = {
  Query: {
    trips: async (_, args, { user }) => db.trips.findAll({
      include: [{ model: db.users, as: 'users' }],
      where: { '$users.id$': user.id }
    }),
    trip: async (_, args, { user }) => db.trips.findOne({
      include: [{ model: db.users, as: 'users' }],
      where: { id: args.id, '$users.id$': user.id }
    })
  },
  Trip: {
    users: async ({ id }) => db.users.findAll({
      include: [{ model: db.trips, as: 'trips' }],
      where: { '$trips.id$': id }
    }),
    budgets: async ({ id }) => db.budgets.findAll({ where: { trip_id: id } }),
    expenses: async ({ id }) => db.expenses.findAll({ where: { trip_id: id } }),
    tasks: async ({ id }) => db.tasks.findAll({ where: { trip_id: id } }),
    remaining_days: async ({ id }) => runQuery(
      queries.remainingDays(id), 'remaining_days'
    ),
    remaning_amount_per_day: async ({ id }) => runQuery(
      queries.remainingAmountPerDay(id), 'remaining_per_day'
    )
  },
  Mutation: {
    addTrip: async (_, args) => db.trips.create({
      name: args.name,
      start_date: args.start_date,
      end_date: args.end_date
    }),
    updateTrip: async (_, args) => {
      const params = { returning: true, where: { id: args.id } }
      const result = await db.trips.update({
        name: args.name,
        start_date: args.start_date,
        end_date: args.end_date
      }, params)

      return result[1][0]
    },
    deleteTrip: async (_, { id }) => db.trips.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
