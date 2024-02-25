const express = require('express')
const app = express()
app.use(express.json())

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

app.get('/', (request, response) => {
    console.log(persons);
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const singlePerson = persons.find(persons => persons.id === id)

    if (singlePerson) {
        response.json(singlePerson)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const date = Date()
    response.send(`<p>Phonebook has info for ${persons.length} people </p> <p>${date}</p>`)
})

app.post('/api/persons', (request, response) => {

    const person = request.body

    const isNameIncluded = persons.some(object => object.name === person.name);

    if (person.name === "" || isNameIncluded == true || person.number === "") {
        response.status(400).send({ error: 'names must be unique' })
    }

    console.log(duplicates, person.name);

    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0


    person.id = maxId + 1

    persons = persons.concat(person)

    response.json(persons)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})