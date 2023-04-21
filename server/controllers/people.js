const personRouter = require('express').Router()
const Person = require('../models/person')

// const baseUrl = '/api/persons'

personRouter.get('/', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).send({ error: `person of id: ${req.params.id} not found.` }).end()
      }
    })
    .catch(error => next(error))
})

personRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  ).then(result => {
    res.json(result)
  })
    .catch(e => {
      next(e)
      return e
    })
})

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (!result) {
        throw({ error: {
          name: 'NO_RECORD_ERROR',
          message: 'Record not found'
        } })
      } else {
        res.status(204).end()
      }
    })
    .catch(e => {
      next(e)
      console.log('delete error: ', e)
      return e
    })
})

personRouter.post('/', (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person.save()
    .then(saved => {
      res.json(saved)
    })
    .catch(e => next(e))
})

module.exports = personRouter
