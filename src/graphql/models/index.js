const auth = require('./auth')
const budgets = require('./budgets')
const categories = require('./categories')
const currencies = require('./currencies')
const expenses = require('./expenses')
const reports = require('./reports')
const tasks = require('./tasks')
const trips = require('./trips')

const domain = require('./domain')

module.exports = [
  auth,
  budgets,
  categories,
  currencies,
  expenses,
  reports,
  tasks,
  trips,

  domain({ singular: 'place', plural: 'places' }),
  domain({ singular: 'source', plural: 'sources' })
]
