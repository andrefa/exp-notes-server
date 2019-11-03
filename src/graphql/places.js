const { gql } = require('apollo-server-express')
const db = require('../database')

const typeDefs = gql`
  extend type Query {
    places: [Place]
    place(id: ID!): Place
  }
  type Place {
    id: ID!
    name: String
  }
`

const resolvers = {
  Query: {
    places: async () => db.places.findAll(),
    place: async (_, args) => db.places.findByPk(args.id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
