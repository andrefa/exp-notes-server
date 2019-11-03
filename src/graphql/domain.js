const { gql } = require('apollo-server-express')
const db = require('../database')
const { capitalize } = require('../utils')

module.exports = ({ singular, plural }) => {
  const entity = capitalize(singular)

  return {
    typeDefs: gql`
      extend type Query {
        ${plural}: [${entity}]
        ${singular}(id: ID!): ${entity}
      }
      type ${entity} {
        id: ID!
        name: String
      }
      extend type Mutation {
        add${entity}(name: String): ${entity}
        update${entity}(id: ID!, name: String): ${entity}
        delete${entity}(id: ID!): Int
      }
    `,
    resolvers: {
      Query: {
        [plural]: async () => db[plural].findAll(),
        [singular]: async (_, args) => db[plural].findByPk(args.id)
      },
      Mutation: {
        [`add${entity}`]: async (_, { name }) => db[plural].create({ name }),
        [`update${entity}`]: async (_, { id, name }) => {
          const params = { returning: true, where: { id } }
          const result = await db[plural].update({ name }, params)

          return result[1][0]
        },
        [`delete${entity}`]: async (_, { id }) => db[plural].destroy({ where: { id } })
      }
    }
  }
}
