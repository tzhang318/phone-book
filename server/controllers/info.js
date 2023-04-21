const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (req, res, next) => {
  Person.estimatedDocumentCount()
    .then(count => {
      res.send(`Phone book has info for ${count} people, ${Date()}`)
    })
    .catch(e => next(e))
})

module.exports = infoRouter