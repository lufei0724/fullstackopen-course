require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Contact = require('./models/contact');

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => console.log(`Phonebook app is listening on port ${PORT}`));

app.use(express.static('build'));
const getBody = (req) => JSON.stringify(req.body);
morgan.token('body', (req) => getBody(req));

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.body(req)]
  .join(' ')));

app.get('/info', (req, res, next) => {
  Contact
    .find({})
    .then((result) => {
      const info = `Phonebook has info for ${result.length} people`;
      const date = new Date();
      res.send(`<p>${info}</p> <p>${date}</p>`);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Contact
    .find({})
    .then((result) => { res.json(result); })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Contact
    .findById(req.params.id)
    .then((contact) => { res.json(contact.toJSON()); })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.end();
    })
    .catch((error) => next(error));
});

app.use(express.json());
app.post('/api/persons', (req, res, next) => {
  const { body } = req;
  if (!body.name) {
    res.status(400).json({ error: 'Name is missing' });
  }
  if (!body.number) {
    res.status(400).json({ error: 'Number is missing' });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((savedContact) => { res.json(savedContact); })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedContact) => {
      res.json(updatedContact.toJSON());
    })
    .catch((error) => next(error));
});

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknowEndpoint);

const errorHandler = (err, req, res, next) => res.status(404)
  .send({ error: err.message });
app.use(errorHandler);
