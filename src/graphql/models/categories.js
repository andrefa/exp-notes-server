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
  extend type Mutation {
    addCategory(name: String, parent_category_id: Int): Category
    updateCategory(id: ID!, name: String, parent_category_id: Int): Category
    deleteCategory(id: ID!): Int
  }
`

const resolvers = {
  Query: {
    categories: async () => db.categories.findAll(),
    category: async (_, args) => db.categories.findByPk(args.id)
  },
  Category: {
    parent_category: async (obj) => db.categories.findByPk(obj.parent_category_id)
  },
  Mutation: {
    addCategory: async (_, args) => db.categories.create({
      name: args.name,
      parent_category_id: args.parent_category_id
    }),
    updateCategory: async (_, args) => {
      const params = { returning: true, where: { id: args.id } }
      const result = await db.categories.update({
        name: args.name,
        parent_category_id: args.parent_category_id
      }, params)

      return result[1][0]
    },
    deleteCategory: async (_, { id }) => db.categories.destroy({ where: { id } })
  }
}

module.exports = {
  typeDefs,
  resolvers
}
