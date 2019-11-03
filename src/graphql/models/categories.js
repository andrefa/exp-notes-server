const { gql } = require('apollo-server-express')
const db = require('../../database')

const typeDefs = gql`
  extend type Query {
    categories: [Category]
    category(id: ID!): Category
  }
  type Category {
    id: ID!
    name: String
    parent_category_id: Int
    parent_category: Category
  }
`

const resolvers = {
  Query: {
    categories: async () => db.categories.findAll(),
    category: async (_, args) => db.categories.findByPk(args.id)
  },
  Category: {
    parent_category: async (obj) => db.categories.findByPk(obj.parent_category_id)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
