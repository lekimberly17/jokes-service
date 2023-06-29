const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/jokes', async (req, res, next) => {
  try {
 
    const tags = req.query.tags;
    const content = req.query.content;
 
    let jokes = await Joke.findAll();
    if (tags) {
      jokes = jokes.filter(j => j.tags.includes(tags));
    }
    if (content) {
      jokes = jokes.filter(j => j.joke.includes(content));
    }
    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
 });

// We export the app, not listening in here, so that we can run tests
module.exports = app;