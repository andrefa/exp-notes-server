require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const graphqlModels = require('./graphql/models')
const graphqlContext = require('./graphql/context')
const config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get('/', (_, res) => res.send('It\'s alive!'))

const server = new ApolloServer({
  modules: graphqlModels,
  context: graphqlContext
})
server.applyMiddleware({ app })

app.listen({ port: config.app.port }, () => console.log(`🚀 Server running at port ${config.app.port}`))
