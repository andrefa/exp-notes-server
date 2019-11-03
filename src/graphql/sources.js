const { gql } = require('apollo-server-express')
const db = require('../database')

const typeDefs = gql`
  extend type Query {
    sources: [Source]
    source(id: ID!): Source
  }
  type Source {
    id: ID!
    name: String
  }
`

const resolvers = {
  Query: {
    sources: async () => db.sources.findAll(),
    source: async (_, args) => db.sources.findByPk(args.id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
