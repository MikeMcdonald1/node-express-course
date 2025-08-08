const { people } = require("../data.js");

const getPeople = (req, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({
    id: people.length + 1,
    name: req.body.name,
  });

  res.status(201).json({
    success: true,
    name: req.body.name,
  });
};

const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  person.name = req.body.name;
  res.status(200).json({ success: true, person });
};

const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  const index = people.findIndex((p) => p.id === id);
  people.splice(index, 1);

  res.status(200).json({ success: true, message: "Person deleted" });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
