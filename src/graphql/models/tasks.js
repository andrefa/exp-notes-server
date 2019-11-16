const { gql } = require('apollo-server-express')
const db = require('../../database')

const typeDefs = gql`
  extend type Query {
    tasks(trip_id: ID!): [Task]
    task(id: ID!): Task
  }
  type Task {
    id: ID!
    trip_id: Int
    trip: Trip
    description: String
    complete: Boolean
  }
  extend type Mutation {
    addTask(trip_id: Int!, description: String!): Task
    editTask(id: ID!, description: String!): Task
    toggleTask(id: ID!, complete: Boolean!): Task
    deleteTask(id: ID!): Int
  }
`

const resolvers = {
  Query: {
    tasks: async (_, args) => db.tasks.findAll({
      where: { trip_id: args.trip_id },
      order: [['id', 'ASC']]
    }),
    task: async (_, { id }) => db.tasks.findByPk(id)
  },
  Task: {
    trip: async (obj) => db.trips.findByPk(obj.trip_id)
  },
  Mutation: {
    addTask: async (_, args) => db.tasks.create({
      trip_id: args.trip_id,
      description: args.description
    }),
    editTask: async (_, { id, description }) => {
      const params = { returning: true, where: { id } }
      const result = await db.tasks.update({ description }, params)
      return result[1][0]
    },
    toggleTask: async (_, { id, complete }) => {
      const params = { returning: true, where: { id } }
      const result = await db.tasks.update({ complete }, params)
      return result[1][0]
    },
    deleteTask: async (_, { id }) => db.tasks.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
