const express = require('express');
const apiRouter = require('./routes/api-router.js');
const { handle500Errors } = require('./errors/errors.js')

const app = express();
app.use(express.json());

app.use('/api', apiRouter);


app.use(handle500Errors);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Invalid URL' })
  })

module.exports = app;