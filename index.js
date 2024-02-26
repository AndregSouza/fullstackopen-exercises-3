const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

const cors = require('cors')

app.use(cors())

morgan.token('req-body', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });

  app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', function (req, res) {
    res.json(persons)
})

app.get('/api/persons/:id', function (req, res) {
    const id = Number(req.params.id)
    const singlePerson = persons.find(persons => persons.id === id)

    if (singlePerson) {
        res.json(singlePerson)
    } else {
        res.status(404).end()
    }
})

app.get('/info', function (req, res) {
    const date = Date()
    res.send(`<p>Phonebook has info for ${persons.length} people </p> <p>${date}</p>`)
})

app.post('/api/persons', function (req, res) {

    const person = req.body

    const isNameIncluded = persons.some(object => object.name === person.name);

    if (person.name === "" || isNameIncluded == true || person.number === "") {
        res.status(400).send({ error: 'names must be unique' })
    }

    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0


    person.id = maxId + 1

    persons = persons.concat(person)

    res.json(persons)
})


app.delete('/api/persons/:id', function (req, res) {
    const id = Number(req.params.id)
    persons = persons.filter(persons => persons.id !== id)

    res.status(204).end()

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})