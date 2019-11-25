require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const graphqlModels = require('./graphql/models')
const graphqlContext = require('./graphql/context')
const { authenticate } = require('./services/auth')
const config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
  modules: graphqlModels,
  context: graphqlContext
})
server.applyMiddleware({ app })

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const token = await authenticate({ email, password })

  res.json({
    token
  })
})

app.listen({ port: config.app.port }, () => console.log(`🚀 Server running at port ${config.app.port}`))
