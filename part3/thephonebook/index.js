const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.use(cors());

app.use(express.static("build"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people </p><p>${new Date()} </p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((person) => person.id === id);
  if (person.length !== 0) {
    console.log(person);
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    console.log(person);
    response.statusMessage = "This person does not exist";
    response.status(404).end();
  }
});

const generateId = () => {
  const newId = Math.floor(Math.random() * 100000);
  return newId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});