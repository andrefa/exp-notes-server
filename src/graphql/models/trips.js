const { gql } = require('apollo-server-express')
const db = require('../../database')

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
    tasks: [Task]
  }
  extend type Mutation {
    addTrip(name: String, start_date: String, end_date: String): Trip
    updateTrip(id: ID!, name: String, start_date: String, end_date: String): Trip
    deleteTrip(id: ID!): Int
  }
`

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
    budgets: async (obj) => db.budgets.findAll({ where: { trip_id: obj.id } }),
    expenses: async (obj) => db.expenses.findAll({ where: { trip_id: obj.id } }),
    tasks: async (obj) => db.tasks.findAll({ where: { trip_id: obj.id } })
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
