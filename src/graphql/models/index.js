const budgets = require('./budgets')
const categories = require('./categories')
const currencies = require('./currencies')
const expenses = require('./expenses')
const trips = require('./trips')

const domain = require('./domain')

module.exports = [
  budgets,
  categories,
  currencies,
  expenses,
  trips,

  domain({ singular: 'place', plural: 'places' }),
  domain({ singular: 'source', plural: 'sources' })
]
