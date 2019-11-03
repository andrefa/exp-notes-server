require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const graphql = require('./graphql')
const config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
  modules: graphql
})

server.applyMiddleware({ app })

app.get('/', (_, res) => res.send('Hello World!'))

app.listen({ port: config.app.port }, () => console.log(`🚀 Server running at port ${config.app.port}`))
